/* 日本岡山 5天4夜：旅遊小神器教學示範資料
 * 此為示範行程，非實際航班、票券或訂房。時間為建議節奏，不代表店家營業時間。
 * 預估支出是教學用假資料，單位 JPY。
 */
const okayamaTrip = {
  title: '日本岡山 5 天 4 夜',
  subtitle: '晴天之國 · 岡山／倉敷／吉備／瀨戶內海',
  destination: '日本・岡山',
  duration: { days: 5, nights: 4 },
  base: '岡山車站周邊（示範住宿地點，尚未訂房）',
  currency: 'JPY',
  note: '行程與費用皆為教學示範。尚未指定旅遊日期、航班與住宿；景點開放時間、交通及船班請出發前再次確認。',
  days: [
    {
      day: 1, title: '抵達岡山・市區散策', area: '岡山市',
      summary: '桃太郎的故鄉，先以悠閒的步調熟悉市區',
      activities: [
        { time: '抵達後', name: '抵達岡山・寄放行李', category: '交通', memo: '依實際班機或鐵路到達時間調整' },
        { time: '下午', name: '岡山站周邊散步與購物', category: '購物', memo: '採買交通卡、補給品' },
        { time: '傍晚', name: '岡山城周邊散步', category: '景點', memo: '抵達過晚可改為夜間外觀散步' },
        { time: '晚上', name: '岡山在地晚餐', category: '美食', memo: '可選擇豬排丼或壽司等' }
      ],
      expenses: [{ label: '晚餐', amount: 2200 }, { label: '市區交通', amount: 600 }]
    },
    {
      day: 2, title: '岡山後樂園・岡山城', area: '岡山市',
      summary: '漫步日本庭園，參觀烏城與旭川河畔',
      activities: [
        { time: '09:00', name: '岡山後樂園', category: '景點', memo: '庭園漫步、拍照' },
        { time: '11:30', name: '旭川河畔散步', category: '散步', memo: '步行至岡山城周邊' },
        { time: '13:00', name: '岡山城', category: '景點', memo: '參觀展區；依官方票價與開館日調整' },
        { time: '16:00', name: '表町商店街', category: '購物', memo: '咖啡、甜點與自由活動' }
      ],
      expenses: [{ label: '景點門票（示意）', amount: 1200 }, { label: '午晚餐', amount: 3200 }, { label: '交通', amount: 500 }]
    },
    {
      day: 3, title: '倉敷美觀地區・大原美術館', area: '倉敷市',
      summary: '白壁街屋、柳樹河道與經典美術館',
      activities: [
        { time: '09:00', name: 'JR 前往倉敷', category: '交通', memo: '從岡山站出發' },
        { time: '10:00', name: '倉敷美觀地區', category: '景點', memo: '白壁街屋、倉敷川散步' },
        { time: '13:00', name: '大原美術館', category: '景點', memo: '依實際開館資訊安排' },
        { time: '15:30', name: '倉敷特色小店・咖啡店', category: '購物', memo: '牛仔布雜貨、甜點等' },
        { time: '傍晚', name: '返回岡山市', category: '交通', memo: '依當日狀況彈性調整' }
      ],
      expenses: [{ label: '往返交通（示意）', amount: 800 }, { label: '美術館（示意）', amount: 2000 }, { label: '餐飲', amount: 2800 }, { label: '購物', amount: 1500 }]
    },
    {
      day: 4, title: '吉備路・歷史散策', area: '岡山／總社',
      summary: '走訪吉備津神社與吉備路田園風光',
      activities: [
        { time: '09:00', name: '吉備津神社', category: '景點', memo: '欣賞神社建築與長迴廊' },
        { time: '11:30', name: '吉備津彥神社（可選）', category: '景點', memo: '視移動方式與體力取捨' },
        { time: '下午', name: '備中國分寺周邊', category: '景點', memo: '交通銜接需事前確認；可改安排岡山市區' },
        { time: '晚上', name: '岡山站周邊自由活動', category: '購物', memo: '準備伴手禮' }
      ],
      expenses: [{ label: '交通（示意）', amount: 1800 }, { label: '餐飲', amount: 2600 }, { label: '伴手禮', amount: 2000 }]
    },
    {
      day: 5, title: '岡山伴手禮・返程', area: '岡山市',
      summary: '輕鬆收尾，預留往返機場或車站時間',
      activities: [
        { time: '上午', name: '岡山站周邊早餐', category: '美食', memo: '依退房時間安排' },
        { time: '中午前後', name: '伴手禮採買', category: '購物', memo: '桃子點心、吉備糰子等' },
        { time: '返程前', name: '前往機場或下一個城市', category: '交通', memo: '實際時刻依班機或鐵路安排' }
      ],
      expenses: [{ label: '餐飲', amount: 1600 }, { label: '伴手禮', amount: 2500 }, { label: '返程交通（示意）', amount: 1200 }]
    }
  ]
};
