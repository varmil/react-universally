const stubReviews = [
  {
    id: 111, title: '使い勝手が良いと思う', rating: 3.5, author: '瀬下テレピ', isAuthenticated: true, postDate: '15/08/30', visitDate: "15/08",
    imgSrc: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/19739/100x100_square_19739196.jpg'
  },
  {
    id: 222, title: 'ビールなどを添えて楽しめる旨いピザ。おしゃれな店内で楽しめるお店。', rating: 4.0, author: 'ぴよたろう', isAuthenticated: true, postDate: '16/07/07', visitDate: "16/02",
    imgSrc: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/41349/100x100_square_41349662.jpg'
  },
  {
    id: 333, title: 'CP良く、昼間から飲めます', rating: 3.3, author: 'FalFreed', isAuthenticated: true, postDate: '16/01/25', visitDate: "15/11",
    imgSrc: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/45941/100x100_square_45941813.jpg'
  },
]

const copiedReviews = stubReviews.concat(stubReviews).concat(stubReviews).concat(stubReviews)




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
  postedReviews: stubReviews,
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

// Review一覧ページ
export const reviews = copiedReviews

// Review詳細
export const review = {
  id: 123,
  title: '',
  rating: 3.33,
  author: '',
  isAuthenticated: true,
  postDate: '',
  visitDate: ''
}
