// PHIÊN BẢN: FORCE UPDATE (TẮT OFFLINE)
// Mục đích: Xóa cache cũ và ép trình duyệt tải code mới từ mạng.

const CACHE_NAME = 'clear-cache-v1';

// 1. Khi cài đặt: Ép buộc chạy ngay lập tức (không chờ tab cũ đóng)
self.addEventListener('install', (e) => {
    console.log('SW: Đang cài đặt phiên bản xóa Cache...');
    self.skipWaiting();
});

// 2. Khi kích hoạt: Xóa sạch toàn bộ bộ nhớ đệm (Cache Storage) cũ
self.addEventListener('activate', (e) => {
    console.log('SW: Đang kích hoạt và dọn dẹp...');
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                console.log('SW: Đang xóa cache cũ ->', key);
                return caches.delete(key);
            }));
        })
    );
    // Chiếm quyền điều khiển các tab đang mở ngay lập tức
    return self.clients.claim();
});

// 3. Khi tải trang (Fetch): Không lưu Cache nữa, luôn tải từ mạng
self.addEventListener('fetch', (e) => {
    // Để trống hoặc chỉ return nghĩa là trình duyệt sẽ tự tải từ mạng như web thường.
    // Nếu mất mạng, web sẽ báo lỗi kết nối (đúng theo yêu cầu tắt Offline).
    return;
});
