# A Little Story About Us

Website thiệp tình yêu tương tác, chỉ dùng HTML + CSS + JavaScript thuần, triển khai trực tiếp trên GitHub Pages.

```
love-letter/
├── index.html
├── css/style.css
├── js/script.js
└── assets/
    ├── images/   (first-meeting.jpg, memory-1.jpg, memory-2.jpg, memory-3.jpg)
    └── music/    (background.mp3)
```

## 1. Chạy trên máy tính
- Cách nhanh nhất: mở `index.html` bằng trình duyệt.
- Hoặc chạy server nhỏ để giống thực tế hơn: mở terminal trong thư mục dự án và gõ `python -m http.server 8000`, rồi vào `http://localhost:8000`.
- Kiểm tra trên điện thoại: bấm F12 trong trình duyệt và bật chế độ thiết bị di động.

## 2. Thay ảnh
Chép ảnh thật vào `assets/images/` với đúng tên:
- `first-meeting.jpg`: ảnh lớn ở Chapter 02 (nên dọc, tỉ lệ 3:4)
- `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg`: ảnh ở 3 mục của Chapter 03 (nên vuông)

Chưa có ảnh thì website vẫn chạy bình thường, chỗ đó sẽ hiện khung thay thế. Nên nén ảnh dưới 300 KB mỗi tấm để tải nhanh. Nếu dùng đuôi khác (`.png`, `.webp`), sửa đường dẫn `src` trong `index.html`.

## 3. Thay nội dung
- Chapter 02, 03: sửa trực tiếp chữ trong `index.html`. Nội dung mở rộng của 3 mục scrapbook nằm trong các thẻ `<p class="memory-text">`.
- Chapter 04 (nội dung lá thư): sửa `CONFIG.letter` ở đầu file `js/script.js`.
- Tốc độ đánh máy: `CONFIG.typingSpeed` (số nhỏ hơn thì nhanh hơn).

## 4. Thay nhạc nền
Chép file nhạc vào `assets/music/` và đặt tên `background.mp3`. Nhạc chỉ phát khi người xem bấm nút ♪ ở góc phải. Nên dùng nhạc piano không lời, nhẹ dưới 5 MB, và chọn nhạc có bản quyền cho phép sử dụng.

## 5. Thay mật khẩu
Mở `js/script.js`, sửa `CONFIG.password` (hiện là `160407`). Lưu ý: vì là website tĩnh, ai biết xem mã nguồn đều thấy được mật khẩu. Đây chỉ là khóa mang tính trò chơi cảm xúc, không dùng để bảo mật thật.

## 6. Đăng lên GitHub Pages
1. Tạo repository mới trên GitHub (ví dụ `love-letter`), để chế độ Public.
2. Tải toàn bộ file lên (giữ nguyên cấu trúc thư mục), hoặc dùng lệnh:
   ```
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/love-letter.git
   git push -u origin main
   ```
3. Vào **Settings → Pages**, mục **Source** chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, rồi bấm Save.
4. Đợi 1 đến 2 phút, website sẽ có tại `https://USERNAME.github.io/love-letter/`.

Toàn bộ đường dẫn trong dự án là đường dẫn tương đối nên không cần sửa gì thêm. Tên file phân biệt chữ hoa và chữ thường trên GitHub Pages (`Memory-1.jpg` khác `memory-1.jpg`).
