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
  // 一番上にあるカルーセル写真
  carouselPhotos: [
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/82/640x640_rect_82444.jpg' },
    { src: 'http://www.civillink.net/fsozaip/phote/fukei3l.jpg' },
    { src: 'http://blogimg.goo.ne.jp/user_image/10/51/a7742ce316956b0565a48fcc4cc59629.jpg' },
    { src: 'http://cdn-rs.ikyu.com/rsDatas/rsData101000/r100539/100539ga10000102.jpg' },
    { src: 'http://www.legato-tokyo.jp/files/2012/04/27.jpg' },
    { src: 'https://tabelog.ssl.k-img.com/resize/660x370c/restaurant/images/Rvw/53004/53004440.jpg?token=98948bb&api=v2' },
  ],

  // TOPにある数枚の画像データ
  postedPhotos: [
    { src: 'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/50068/640x640_rect_50068940.jpg' },
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
  title: 'ビールなどを添えて楽しめる旨いピザ。オシャレな店内で雰囲気良く楽しめるお店。',
  rating: 3.89,
  author: 'セシモテレビ',
  isAuthenticated: true,
  postDate: '15/08/30',
  visitDate: "15/08",

  authorAvatar: 'https://tabelog.ssl.k-img.com/user/images/Profile/547/70x70_547879.jpg?1460631756',
  budget: 'US$10 - US$19',
  comment: '渋谷の北側、線路の見える坂道の通り沿いにある飲食店タイプのピザ屋さん。<br>通り沿いから見えるレジカウンターでピザ、サイドメニュー、ドリンクなどをオーダーして、奥の席で食べるお店です。<br><br>ピザは1人で食べるとお腹一杯になる量で、確か26cm直径だったか。<br>ベーシックなピザが350円と超お値打ちで、トッピング有でしっかり食べたい場合でも700円前後で楽しめるのが嬉しい。<br>飲み物はソフトドリンクだけでなく海外銘柄のビールが幾つかあり、グラスワインもあります。<br><br>店内すぐにカウンター席があり、奥に広がるテーブル席はテクノのニュアンスを軽く感じるスタイリッシュなオシャレ空間。<br>洒落た男女などが談笑するテーブル席は、どことなくいい雰囲気です。<br><br>●ピザ カプリチョーザ 650円<br>ツナ、マッシュルーム、コーンの入った、チーズとトマトソースのピザ。<br>適度にモチッとしつつ厚すぎず食べやすい生地には軽い焼きの香ばしさが出ていて好印象。<br><br>チーズはとろけるチーズ系タイプでしょうか、オーソドックスな味わいですが安っぽさは出ていなくていい感じ。<br>味わいのそこそこあるコーンにツナが加わり、そこそこジューシーで楽しめます。<br><br>一人で食べると腹八分超えで不足は無いですが、飽き気味になってくるので複数人でシェアして食べるほうがいいでしょう。<br><br>●グラスワイン 赤 500円<br>酸味や渋味が抑えられていて飲みやすいグラスワインがあり、ピザとも合います。<br><br>ドリンク自体の値段はそこそこですが、昼はチャージ無しなのでワンドリンクで軽く酒を入れたいときはピッタリ。<br>付近のお店はそこそこ高いので、サッと入れるお店として重宝します。テイクアウトも可能。',
  imgSrc: [
    'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/41349/320x320_square_41349662.jpg',
    'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/41349/320x320_rect_41349660.jpg',
    'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/41349/320x320_square_41349660.jpg',
    'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/41349/320x320_square_41349646.jpg',
    'https://tabelog.ssl.k-img.com/restaurant/images/Rvw/41349/320x320_square_41349651.jpg',
  ],
}
