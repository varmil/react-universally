import _ from 'lodash'

const names = [
  '焼肉酒家 李苑',
  '日本海庄や ダイワロイネットホテル浜松店',
  '渋谷　パスタ　マルコ・ドーニ（MARCI　DONI）',
  'シーフードイタリアン ピザ＆パスタ淡路島の恵み トラットリア・ドーニ 渋谷道玄坂店',
  'miyamas bar&dine',
]

const areas = [
  '渋谷',
  '神泉',
  '三軒茶屋',
  '東新宿',
  '新浜松',
]

const genres = [
  '焼肉、居酒屋、ステーキ',
  '居酒屋',
  'イタリアン、ダイニングバー、カフェ',
  'イタリアン、スペイン料理、バル・バール',
]

const prTexts = [
  'A5最高黒毛和牛の宮崎牛が食べられるお店',
  '全国各地から仕入れた自慢の新鮮魚介！お酒のお供にぴったりのメニューは約100種類！',
  '渋谷駅徒歩2分の隠れ家ビストロ。少人数で貸し切りOK（8名様〜15名様）個室あります。',
  '450万人が参加する『世界一パスタコンクール』で3連続優勝のマルコ氏完全監修!!',
  'デザイナーズカフェ【少人数で貸切OK!】3480円で貸切コース＋飲み放題!!◆駅徒歩6分◆'
]

const budgets = _.range(1000, 20000, 1000)

function createEntity(index) {
  const id = index
  const rating = _.chain(_.random(2.5, 4.0)).round(2).value()
  const lowerLimitBudget = _.sample(budgets)

  return {
    [id]: {
      id: id,
      name: _.sample(names),
      area: _.sample(areas),
      genre: _.sample(genres),
      rating: rating,
      review: _.random(1, 100),
      prText: _.sample(prTexts),
      lowerLimitBudget: lowerLimitBudget,
      upperLimitBudget: lowerLimitBudget + 999,
      distance: _.random(100, 1000),
    }
  }
}

const list = _.range(1, 10).reduce((cur, id) => Object.assign(cur, createEntity(id)), {})

export default list
