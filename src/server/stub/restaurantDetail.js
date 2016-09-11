// タブ共通で使うデータ。店の基本情報を返す感じかな
export const common =  {
  id: 123456,
  name: "シーフードイタリアン ピザ＆パスタ淡路島の恵み トラットリア・ドーニ 渋谷道玄坂店",
  area: "新浜松",
  genre: "イタリアン、スペイン料理、バル・バール",
  rating: 3.38,
  reviewCount: 77,
  prText: "A5最高黒毛和牛の宮崎牛が食べられるお店",
  lowerLimitBudget: 2000,
  upperLimitBudget: 2999,
  distance: 173,

  tel: '090-1234-5678',
  address: '東京都渋谷区道玄坂2-29-5 渋谷プライム　５Ｆ',
  lat: 35.659529,
  lng: 139.698166,
}

// TOPで使うデータ
export const top = {
  // TOPにある数枚の画像データ
  postedPhotos: [
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/53211/150x150_square_53211251.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/53211/150x150_square_53211248.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/49783/150x150_square_49783127.jpg' },
  ],

  // TOPにでている数個の口コミ
  postedReviews: [
    { title: '', rating: 3.33, author: '', isAuthenticated: true, postDate: '', visitDate: '' },
    { title: '', rating: 3.33, author: '', isAuthenticated: true, postDate: '', visitDate: '' },
    { title: '', rating: 3.33, author: '', isAuthenticated: true, postDate: '', visitDate: '' },
  ],
}

// photo画面で使うデータ。配列よりObjectのほうがいいかも。
export const photo = {
  list:[
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/53211/150x150_square_53211251.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/53211/150x150_square_53211248.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/49783/150x150_square_49783127.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/47148/150x150_square_47148673.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/43874/150x150_square_43874911.jpg' },

    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/49498/100x100_square_49498659.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/49688/100x100_square_49688387.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/48621/100x100_square_48621081.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/49495/100x100_square_49495727.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/55523/100x100_square_55523195.jpg' },
  ]
}
