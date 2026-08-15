import { SubmittedOrder, SyncStatus } from '../types';

const STORAGE_KEY_ORDERS = 'viet_han_orders';

interface StoredOrderWrapper {
  order: SubmittedOrder;
  synced: boolean;
}

/** Chuyển đơn hàng thành mảng row để gửi lên Google Sheet */
export function orderToRow(order: SubmittedOrder): (string | number)[] {
  const packageLabel =
    order.quantityOptionId === '1_pack_200g'
      ? '1 Gói 200g (279.000đ)'
      : order.quantityOptionId === '1_pack_500g'
      ? '1 Gói 500g (480.000đ)'
      : '2 Gói 500g - 1kg (900.000đ)';

  const paymentText =
    order.paymentMethod === 'cod'
      ? 'Thanh toán COD (khi nhận hàng)'
      : 'Chuyển khoản ngân hàng';

  return [
    order.id,
    isNaN(new Date(order.createdAt).getTime()) 
      ? order.createdAt 
      : new Date(order.createdAt).toLocaleString('vi-VN'),
    order.fullName,
    `'${order.phone}`, // prefix ' để Google Sheet giữ số 0 đầu
    order.province,
    order.district,
    order.ward,
    order.addressDetail,
    packageLabel,
    order.totalAmount,
    paymentText,
    order.note || '',
    order.status,
  ];
}

/** Lưu hoặc cập nhật trạng thái đơn hàng trong localStorage */
function saveLocalOrder(order: SubmittedOrder, synced = false): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    const list: StoredOrderWrapper[] = raw ? JSON.parse(raw) : [];
    
    // Tìm xem đơn đã có trong máy chưa
    const existingIndex = list.findIndex(item => item.order.id === order.id);
    if (existingIndex > -1) {
      list[existingIndex].synced = synced;
    } else {
      list.unshift({ order, synced });
    }
    
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving local order:', err);
  }
}

/** Gửi đơn hàng tới Google Apps Script Webhook */
async function sendOrderToWebhook(webhookUrl: string, order: SubmittedOrder): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rowValues: orderToRow(order) }),
  });
  // Với no-cors, fetch thành công (không ném lỗi) tức là đã chuyển đi được
  saveLocalOrder(order, true);
}

/** Quét và tự động đồng bộ lại các đơn hàng chưa gửi được (pending) */
export async function syncPendingOrders(): Promise<void> {
  const webhookUrl = import.meta.env.VITE_GOOGLE_WEBHOOK_URL as string;
  if (!webhookUrl?.trim().startsWith('http')) return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!raw) return;

    const list: StoredOrderWrapper[] = JSON.parse(raw);
    const pending = list.filter(item => !item.synced);

    if (pending.length === 0) return;
    console.log(`[Sync] Đang đồng bộ lại ${pending.length} đơn hàng chờ...`);

    // Gửi lần lượt các đơn chưa đồng bộ
    for (const item of pending) {
      await sendOrderToWebhook(webhookUrl.trim(), item.order)
        .then(() => {
          console.log(`[Sync] Đồng bộ thành công đơn: ${item.order.id}`);
        })
        .catch(err => {
          console.error(`[Sync] Lỗi khi gửi đơn ${item.order.id}:`, err);
        });
    }
  } catch (err) {
    console.error('[Sync] Lỗi trong quá trình quét đơn chờ:', err);
  }
}

/** Hàm chính: được gọi khi khách bấm "Đặt mua ngay" */
export async function syncOrderToGoogleSheets(order: SubmittedOrder): Promise<SyncStatus> {
  // Luôn lưu local trước với trạng thái chưa đồng bộ (synced = false)
  saveLocalOrder(order, false);

  const webhookUrl = import.meta.env.VITE_GOOGLE_WEBHOOK_URL as string;
  if (webhookUrl?.trim().startsWith('http')) {
    // Gọi gửi webhook chạy ngầm
    sendOrderToWebhook(webhookUrl.trim(), order)
      .then(() => {
        saveLocalOrder(order, true);
      })
      .catch((err) => {
        console.error('Không thể đồng bộ ngay lập tức (sẽ tự thử lại khi có mạng):', err);
      });
  }

  return { success: true, message: 'Đã tiếp nhận đơn hàng thành công!' };
}

// Đăng ký tự động đồng bộ khi khôi phục kết nối internet
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    syncPendingOrders();
  });
  // Chạy quét thử một lần khi web được tải xong
  window.addEventListener('load', () => {
    syncPendingOrders();
  });
}
