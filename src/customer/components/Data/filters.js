export const filters = [
    {
        id: '1',
        name: 'Thể loại',
        options: [
            { value: 'children', label: 'Thiếu nhi', checked: false },
            { value: 'literature', label: 'Văn học', checked: false },
            { value: 'manga', label: 'Manga', checked: true },
            { value: 'economic', label: 'Kinh tế', checked: false },
        ],
    },
    {
        id: '2',
        name: 'Tác giả',
        options: [
            { value: 'author1', label: 'Nguyễn Nhật Ánh', checked: false },
            { value: 'author2', label: 'J.K.Rowling', checked: false },
            { value: 'author3', label: 'Dan Brown', checked: true },
            { value: 'author4', label: 'Haruki Murakami', checked: false },
            { value: 'author5', label: 'Agatha Christie', checked: false },
            { value: 'author6', label: 'Paulo Coellho', checked: false },
        ],
    },
    {
        id: '3',
        name: 'Nhà xuất bản',
        options: [
            { value: 'nxb1', label: 'Nhà Xuất Bản Kim Đồng', checked: false },
            { value: 'nxb2', label: 'Nhà Xuất Bản Văn Học', checked: false },
            { value: 'nxb3', label: 'Nhà Xuất Bản Trẻ', checked: false },
            { value: 'nxb4', label: 'Nhà Xuất Bản Thế Giới', checked: false },
            { value: 'nxb5', label: 'Nhà Xuất Bản Đại Học Quốc Gia Hà Nội', checked: false },
            { value: 'nxb6', label: 'Nhà Xuất Bản Tri Thức', checked: true },
        ],
    },
    {
        id: '4',
        name: 'Giá',
        options: [
            { value: '0', label: '0đ - 150.000đ', checked: false },
            { value: '15000', label: '150.000đ - 300.000đ', checked: false },
            { value: '300000', label: '300.000đ - 500.000đ', checked: false },
            { value: '500000', label: '500.000đ - 700.000đ', checked: false },
            { value: '700000', label: '700.000đ trở lên', checked: false },
        ],
    },
];
