import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

type Q = {
  topic: string
  q: string
  opts: [string, string, string, string]
  ans: 0 | 1 | 2 | 3
  expl: string
}

const QUESTIONS: Q[] = [

  // ── Present Simple ────────────────────────────────────────────────────────
  {
    topic: 'Present Simple',
    q: 'An electric car _____ no petrol to run — it uses a battery instead.',
    opts: ['is needing', 'needed', 'needs', 'need'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "needs"</strong><br><br>
Sự thật hiện tại về xe điện → hiện tại đơn. Chủ ngữ "An electric car" (số ít) → động từ thêm -s.<br><br>
<strong>Quy tắc:</strong> He/She/It/Số ít + V-s/es`,
  },
  {
    topic: 'Present Simple',
    q: 'Most people in big cities _____ public transport to work every day.',
    opts: ['takes', 'is taking', 'take', 'are taking'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "take"</strong><br><br>
Thói quen hàng ngày ("every day") → hiện tại đơn. "Most people" là chủ ngữ số nhiều → động từ không thêm -s.`,
  },
  {
    topic: 'Present Simple',
    q: 'The streaming platform _____ new content every Friday.',
    opts: ['is releasing', 'released', 'releases', 'have released'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "releases"</strong><br><br>
Lịch trình cố định, định kỳ → hiện tại đơn. Chủ ngữ "The platform" (số ít) → releases.`,
  },
  {
    topic: 'Present Simple',
    q: 'Remote workers usually _____ their own hours and choose where to work.',
    opts: ['sets', 'is setting', 'set', 'are setting'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "set"</strong><br><br>
"Usually" là trạng từ tần suất → hiện tại đơn. "Remote workers" (số nhiều) → set (không thêm -s).`,
  },
  {
    topic: 'Present Simple',
    q: 'This AI chatbot _____ questions faster than any human assistant.',
    opts: ['answer', 'is answering', 'are answering', 'answers'],
    ans: 3,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "answers"</strong><br><br>
Sự thật chung về khả năng của chatbot → hiện tại đơn. "This AI chatbot" (số ít) → answers.`,
  },
  {
    topic: 'Present Simple',
    q: 'She _____ to the gym three times a week to stay fit.',
    opts: ['is going', 'went', 'goes', 'go'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "goes"</strong><br><br>
Thói quen định kỳ ("three times a week") → hiện tại đơn. "She" (số ít) → goes.`,
  },
  {
    topic: 'Present Simple',
    q: 'The sun _____ in the east and _____ in the west.',
    opts: ['rise / set', 'rises / sets', 'is rising / setting', 'rose / set'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "rises / sets"</strong><br><br>
Sự thật tự nhiên bất biến → hiện tại đơn. "The sun" (số ít) → rises, sets.`,
  },
  {
    topic: 'Present Simple',
    q: 'Digital nomads _____ from cafés, co-working spaces, or wherever they want.',
    opts: ['is working', 'works', 'worked', 'work'],
    ans: 3,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "work"</strong><br><br>
Mô tả lối sống chung của số nhiều người → hiện tại đơn. "Digital nomads" (số nhiều) → work.`,
  },
  {
    topic: 'Present Simple',
    q: 'Water _____ at 100 degrees Celsius at sea level.',
    opts: ['is boiling', 'boiled', 'boils', 'boil'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án: "boils"</strong><br><br>
Sự thật khoa học → hiện tại đơn. "Water" (danh từ không đếm được, coi như số ít) → boils.`,
  },

  // ── Present Continuous ────────────────────────────────────────────────────
  {
    topic: 'Present Continuous',
    q: 'Car companies _____ cheaper electric models to attract more buyers this year.',
    opts: ['launch', 'launched', 'are launching', 'have launched'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "are launching"</strong><br><br>
"This year" chỉ giai đoạn đang diễn ra → hiện tại tiếp diễn. Xu hướng đang thay đổi trong giai đoạn hiện tại.<br><br>
<strong>Cấu trúc:</strong> S + am/is/are + V-ing`,
  },
  {
    topic: 'Present Continuous',
    q: 'Look! The robots _____ the car parts on the assembly line.',
    opts: ['weld', 'welded', 'are welding', 'have welded'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "are welding"</strong><br><br>
"Look!" là tín hiệu hành động đang xảy ra ngay lúc nói → hiện tại tiếp diễn.`,
  },
  {
    topic: 'Present Continuous',
    q: 'She _____ a new podcast about mental health at the moment.',
    opts: ['records', 'recorded', 'is recording', 'has recorded'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "is recording"</strong><br><br>
"At the moment" → hành động tạm thời đang diễn ra → hiện tại tiếp diễn.`,
  },
  {
    topic: 'Present Continuous',
    q: 'The price of electric vehicles _____ rapidly due to new battery technology.',
    opts: ['fell', 'is falling', 'falls', 'has fallen'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "is falling"</strong><br><br>
Xu hướng đang thay đổi trong giai đoạn hiện tại → hiện tại tiếp diễn. Không có "right now" nhưng ngữ cảnh rõ ràng.`,
  },
  {
    topic: 'Present Continuous',
    q: 'I _____ a plant-based diet this month to see how it feels.',
    opts: ['try', 'tried', 'have tried', 'am trying'],
    ans: 3,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "am trying"</strong><br><br>
"This month" chỉ hành động tạm thời đang thực hiện trong giai đoạn hiện tại → hiện tại tiếp diễn.`,
  },
  {
    topic: 'Present Continuous',
    q: 'We _____ to a new apartment next week. Everything is packed.',
    opts: ['move', 'moved', 'are moving', 'will moved'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "are moving"</strong><br><br>
Hiện tại tiếp diễn dùng cho kế hoạch đã sắp xếp trong tương lai gần. "Next week" + mọi thứ đã chuẩn bị → kế hoạch chắc chắn.`,
  },
  {
    topic: 'Present Continuous',
    q: 'More students _____ online courses instead of going to traditional schools these days.',
    opts: ['choose', 'chose', 'are choosing', 'have chosen'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "are choosing"</strong><br><br>
"These days" → xu hướng đang thay đổi trong xã hội → hiện tại tiếp diễn.`,
  },
  {
    topic: 'Present Continuous',
    q: 'The government _____ new laws to reduce carbon emissions this session.',
    opts: ['considers', 'considered', 'is considering', 'has considered'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "is considering"</strong><br><br>
Hành động đang trong quá trình diễn ra trong kỳ họp hiện tại → hiện tại tiếp diễn.`,
  },
  {
    topic: 'Present Continuous',
    q: 'My smartwatch _____ my sleep patterns every night this week.',
    opts: ['track', 'tracked', 'is tracking', 'tracks'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án: "is tracking"</strong><br><br>
"This week" + hành động tạm thời đang xảy ra → hiện tại tiếp diễn.`,
  },

  // ── Stative Verbs ─────────────────────────────────────────────────────────
  {
    topic: 'Stative Verbs',
    q: 'This electric car _____ great. It is quiet and very smooth to drive.',
    opts: ['is sounding', 'sounds', 'is seeming', 'is feeling'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "sounds"</strong><br><br>
"Sound" (khi có nghĩa "nghe có vẻ") là stative verb → không dùng -ing. Dùng hiện tại đơn.`,
  },
  {
    topic: 'Stative Verbs',
    q: 'He _____ to live abroad and work as a digital nomad.',
    opts: ['is wanting', 'wants', 'is needing', 'wanting'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "wants"</strong><br><br>
"Want" là stative verb → không dùng hình thức -ing. Luôn dùng hiện tại đơn để diễn tả mong muốn.`,
  },
  {
    topic: 'Stative Verbs',
    q: 'The plant-based burger _____ exactly like real beef to most people.',
    opts: ['is tasting', 'tastes', 'taste', 'are tasting'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "tastes"</strong><br><br>
"Taste" khi có nghĩa "có vị" là stative verb → không dùng -ing. "The burger" (số ít) → tastes.`,
  },
  {
    topic: 'Stative Verbs',
    q: 'I _____ that social media _____ a big impact on mental health.',
    opts: ['am thinking / is having', 'think / has', 'think / is having', 'am thinking / has'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "think / has"</strong><br><br>
"Think" (ý kiến) và "have" (sở hữu/tác động) là stative verbs → không dùng -ing trong những nghĩa này.`,
  },
  {
    topic: 'Stative Verbs',
    q: 'This new fitness app _____ 10 million users worldwide.',
    opts: ['is having', 'has', 'is owning', 'owns'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "has"</strong><br><br>
"Have" khi có nghĩa "sở hữu/bao gồm" là stative verb → dùng hiện tại đơn, không dùng "is having".`,
  },
  {
    topic: 'Stative Verbs',
    q: 'She _____ how to code in Python after only three months of learning.',
    opts: ['is knowing', 'knows', 'is understanding', 'understanding'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "knows"</strong><br><br>
"Know" là stative verb chỉ kiến thức/kỹ năng → không dùng -ing. "She" (số ít) → knows.`,
  },
  {
    topic: 'Stative Verbs',
    q: 'The AI model _____ a huge amount of data from the internet.',
    opts: ['is containing', 'contains', 'contain', 'are containing'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "contains"</strong><br><br>
"Contain" là stative verb → không dùng -ing. "The AI model" (số ít) → contains.`,
  },
  {
    topic: 'Stative Verbs',
    q: 'The new update _____ a lot of bugs, so users are frustrated.',
    opts: ['is having', 'have', 'has', 'are having'],
    ans: 2,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "has"</strong><br><br>
"Have" nghĩa "chứa/có" là stative verb → hiện tại đơn. "The update" (số ít) → has.`,
  },
  {
    topic: 'Stative Verbs',
    q: 'Most people _____ the idea of a four-day work week.',
    opts: ['are preferring', 'prefer', 'is preferring', 'preferred'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án: "prefer"</strong><br><br>
"Prefer" là stative verb chỉ sở thích → không dùng -ing. "Most people" (số nhiều) → prefer.`,
  },

  // ── Past Simple ───────────────────────────────────────────────────────────
  {
    topic: 'Past Simple',
    q: 'Tesla _____ its first Cybertruck deliveries at the end of 2023.',
    opts: ['makes', 'is making', 'made', 'has made'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "made"</strong><br><br>
"At the end of 2023" là thời điểm xác định trong quá khứ → quá khứ đơn. "Make" → "made" (bất quy tắc).`,
  },
  {
    topic: 'Past Simple',
    q: 'She _____ her first online course two years ago and loved it.',
    opts: ['takes', 'is taking', 'has taken', 'took'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "took"</strong><br><br>
"Two years ago" là mốc thời gian cụ thể trong quá khứ → quá khứ đơn. "Take" → "took" (bất quy tắc).`,
  },
  {
    topic: 'Past Simple',
    q: 'The government _____ new EV subsidies last January.',
    opts: ['announce', 'is announcing', 'has announced', 'announced'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "announced"</strong><br><br>
"Last January" xác định rõ thời điểm trong quá khứ → quá khứ đơn. Thêm -ed cho động từ có quy tắc.`,
  },
  {
    topic: 'Past Simple',
    q: 'SpaceX _____ a rocket to Mars orbit for the first time in 2024.',
    opts: ['sends', 'is sending', 'sent', 'has sent'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "sent"</strong><br><br>
"In 2024" → thời điểm quá khứ đã kết thúc → quá khứ đơn. "Send" → "sent" (bất quy tắc).`,
  },
  {
    topic: 'Past Simple',
    q: 'She _____ her remote job and _____ to Bali as a digital nomad last year.',
    opts: ['quit / move', 'quitted / moved', 'quit / moved', 'quited / moved'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "quit / moved"</strong><br><br>
"Quit" không thay đổi ở quá khứ (quit-quit). "Move" → moved. Cả hai đều ở quá khứ đơn theo "last year".`,
  },
  {
    topic: 'Past Simple',
    q: 'The esports team _____ the world championship after months of training.',
    opts: ['wins', 'is winning', 'won', 'has won'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "won"</strong><br><br>
Sự kiện đã hoàn thành trong quá khứ (ngụ ý đã kết thúc) → quá khứ đơn. "Win" → "won" (bất quy tắc).`,
  },
  {
    topic: 'Past Simple',
    q: 'The factory workers _____ strike for better wages and conditions.',
    opts: ['went on', 'go on', 'are going on', 'have gone on'],
    ans: 0,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "went on"</strong><br><br>
Sự kiện đã xảy ra và hoàn thành trong quá khứ → quá khứ đơn. "Go on strike" → "went on strike".`,
  },
  {
    topic: 'Past Simple',
    q: 'I _____ a smartwatch last birthday and it changed my fitness habits.',
    opts: ['buy', 'am buying', 'bought', 'have bought'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "bought"</strong><br><br>
"Last birthday" → thời điểm cụ thể trong quá khứ → quá khứ đơn. "Buy" → "bought" (bất quy tắc).`,
  },
  {
    topic: 'Past Simple',
    q: 'The airline _____ all flights during the storm yesterday.',
    opts: ['cancels', 'is cancelling', 'cancelled', 'has cancelled'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án: "cancelled"</strong><br><br>
"Yesterday" → thời điểm xác định trong quá khứ → quá khứ đơn. "Cancel" → "cancelled".`,
  },

  // ── Past Continuous ───────────────────────────────────────────────────────
  {
    topic: 'Past Continuous',
    q: 'He _____ an online fitness class when the internet went down.',
    opts: ['did', 'was doing', 'had done', 'does'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "was doing"</strong><br><br>
Hành động đang diễn ra (was doing) bị gián đoạn bởi hành động ngắn (went down) → quá khứ tiếp diễn + when + quá khứ đơn.`,
  },
  {
    topic: 'Past Continuous',
    q: 'At 9 pm last night, the team _____ about their new product launch.',
    opts: ['discussed', 'was discussing', 'were discussing', 'have discussed'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "were discussing"</strong><br><br>
"At 9 pm last night" xác định thời điểm trong quá khứ → hành động đang xảy ra tại thời điểm đó → quá khứ tiếp diễn. "The team" (số nhiều) → were.`,
  },
  {
    topic: 'Past Continuous',
    q: 'While she _____ her podcast, her phone _____ with notifications.',
    opts: ['recorded / blew up', 'was recording / blew up', 'recorded / was blowing up', 'was recording / was blowing up'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "was recording / blew up"</strong><br><br>
"While" + hành động dài (was recording) + hành động ngắn đột ngột (blew up) → quá khứ tiếp diễn + while + quá khứ đơn.`,
  },
  {
    topic: 'Past Continuous',
    q: 'They _____ the EV charging station when the power cut happened.',
    opts: ['built', 'were building', 'had built', 'have built'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "were building"</strong><br><br>
Hành động đang diễn ra bị gián đoạn → quá khứ tiếp diễn. "They" → were building.`,
  },
  {
    topic: 'Past Continuous',
    q: 'I _____ to sleep when I heard a loud notification on my phone.',
    opts: ['tried', 'was trying', 'am trying', 'have tried'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "was trying"</strong><br><br>
Hành động đang xảy ra (was trying) bị gián đoạn bởi hành động đột ngột (heard) → quá khứ tiếp diễn.`,
  },
  {
    topic: 'Past Continuous',
    q: 'The two sides _____ a climate deal when talks broke down.',
    opts: ['negotiated', 'were negotiating', 'had negotiated', 'have negotiated'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "were negotiating"</strong><br><br>
Hành động liên tục đang diễn ra bị đứt đoạn bởi "talks broke down" → quá khứ tiếp diễn.`,
  },
  {
    topic: 'Past Continuous',
    q: 'This time last year, she _____ remotely from a beach in Portugal.',
    opts: ['worked', 'was working', 'is working', 'has worked'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "was working"</strong><br><br>
"This time last year" xác định thời điểm trong quá khứ → hành động đang diễn ra tại thời điểm đó → quá khứ tiếp diễn.`,
  },
  {
    topic: 'Past Continuous',
    q: 'The students _____ their online exam when the website crashed.',
    opts: ['took', 'were taking', 'had taken', 'have taken'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "were taking"</strong><br><br>
Hành động đang diễn ra (were taking) bị gián đoạn (website crashed) → quá khứ tiếp diễn.`,
  },
  {
    topic: 'Past Continuous',
    q: 'While we _____ the game, our coach _____ notes on everyone.',
    opts: ['played / was taking', 'were playing / was taking', 'played / took', 'were playing / took'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án: "were playing / was taking"</strong><br><br>
Hai hành động song song đang diễn ra cùng lúc trong quá khứ → cả hai dùng quá khứ tiếp diễn.`,
  },

  // ── Used to ───────────────────────────────────────────────────────────────
  {
    topic: 'Used to',
    q: 'People _____ get paper maps before smartphones became common.',
    opts: ['used to', 'are used to', 'use to', 'were used to'],
    ans: 0,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "used to"</strong><br><br>
"Used to + V" diễn tả thói quen hoặc trạng thái trong quá khứ nhưng KHÔNG còn ở hiện tại. Câu phủ định: didn't use to. Câu hỏi: Did you use to...?`,
  },
  {
    topic: 'Used to',
    q: 'She _____ smoking, but she gave it up when she started her health journey.',
    opts: ['is used to', 'used to', 'use to', 'would'],
    ans: 1,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "used to"</strong><br><br>
Thói quen trong quá khứ không còn nữa ("gave it up") → "used to + smoke".`,
  },
  {
    topic: 'Used to',
    q: 'There _____ no electric cars on the streets — now they are everywhere.',
    opts: ['use to be', 'used to be', 'were used to be', 'would be'],
    ans: 1,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "used to be"</strong><br><br>
Trạng thái trong quá khứ không còn đúng ở hiện tại → "used to be". Lưu ý: "used to be" không phải "used to been".`,
  },
  {
    topic: 'Used to',
    q: 'He _____ work from an office, but now he works from home.',
    opts: ['is used to', 'use to', 'used to', 'was used to'],
    ans: 2,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "used to"</strong><br><br>
"Used to + V (bare infinitive)" = thói quen quá khứ đã thay đổi. Đây khác với "be used to + V-ing" (đã quen với việc gì).`,
  },
  {
    topic: 'Used to',
    q: 'Children _____ play outside more before screens became so popular.',
    opts: ['are used to', 'used to', 'use to', 'had used to'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ / Used to</span>
<strong>Đáp án: "used to"</strong><br><br>
Thói quen trẻ em trong quá khứ, nay đã thay đổi → "used to play".`,
  },
  {
    topic: 'Used to',
    q: 'She _____ take the bus, but now she rides an e-bike to work.',
    opts: ['use to', 'is used to', 'used to', 'was used to'],
    ans: 2,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "used to"</strong><br><br>
Thói quen quá khứ không còn → "used to take". "Is used to" + V-ing/noun nghĩa là "đã quen với".`,
  },
  {
    topic: 'Used to',
    q: 'Streaming services _____ exist — people _____ rent DVDs from a shop.',
    opts: ["didn't use to / used to", "weren't used to / used to", "used not to / use to", "hadn't used to / would"],
    ans: 0,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "didn't use to / used to"</strong><br><br>
Phủ định của "used to" là "didn't use to" (không thêm -d). Câu thứ hai: thói quen quá khứ → "used to rent".`,
  },
  {
    topic: 'Used to',
    q: '_____ you use to have a flip phone when you were young?',
    opts: ['Did', 'Were', 'Had', 'Would'],
    ans: 0,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "Did"</strong><br><br>
Câu hỏi với "used to" → dùng trợ động từ "Did". Cấu trúc: Did + S + use to + V?`,
  },
  {
    topic: 'Used to',
    q: 'Online shopping _____ be a small part of the market, but now it dominates.',
    opts: ['uses to', 'used to', 'is used to', 'was used to'],
    ans: 1,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án: "used to"</strong><br><br>
Trạng thái trong quá khứ đã thay đổi → "used to be". Không cần "be" sau "used to" khi động từ chính không phải "be" — ở đây cần: "used to be a small part."`,
  },

  // ── Present Perfect ───────────────────────────────────────────────────────
  {
    topic: 'Present Perfect',
    q: 'Electric vehicle sales _____ 500% in the last five years.',
    opts: ['grew', 'have grown', 'are growing', 'grow'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "have grown"</strong><br><br>
"In the last five years" → khoảng thời gian kéo dài đến hiện tại → hiện tại hoàn thành.<br><br>
<strong>Cấu trúc:</strong> S + have/has + V3/past participle`,
  },
  {
    topic: 'Present Perfect',
    q: 'She _____ three online certifications since last year.',
    opts: ['earned', 'has earned', 'earns', 'is earning'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "has earned"</strong><br><br>
"Since last year" → từ mốc quá khứ đến nay → hiện tại hoàn thành. "She" (số ít) → has earned.`,
  },
  {
    topic: 'Present Perfect',
    q: 'Scientists _____ a new approach to removing carbon from the atmosphere.',
    opts: ['discover', 'discovered', 'have discovered', 'are discovering'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "have discovered"</strong><br><br>
Kết quả vừa đạt được, liên quan đến hiện tại (không có mốc thời gian quá khứ cụ thể) → hiện tại hoàn thành.`,
  },
  {
    topic: 'Present Perfect',
    q: 'I _____ never _____ a plant-based burger before. Can I try one?',
    opts: ['have / tried', 'had / tried', 'did / try', 'was / trying'],
    ans: 0,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "have / tried"</strong><br><br>
"Never" + kinh nghiệm trong cuộc đời → hiện tại hoàn thành. Cấu trúc: have/has + never + V3.`,
  },
  {
    topic: 'Present Perfect',
    q: 'The company _____ just _____ its new AI assistant to the public.',
    opts: ['has / released', 'had / released', 'did / release', 'is / releasing'],
    ans: 0,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "has / released"</strong><br><br>
"Just" với hiện tại hoàn thành = vừa mới xảy ra → has + just + V3.`,
  },
  {
    topic: 'Present Perfect',
    q: 'How many countries _____ signed the new climate agreement so far?',
    opts: ['did', 'have', 'had', 'are'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "have"</strong><br><br>
"So far" (cho đến nay) → hiện tại hoàn thành. Câu hỏi: How many + noun + have + V3?`,
  },
  {
    topic: 'Present Perfect',
    q: 'She _____ already _____ her flight for next month.',
    opts: ['has / booked', 'had / booked', 'did / book', 'is / booking'],
    ans: 0,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "has / booked"</strong><br><br>
"Already" trong câu khẳng định → hiện tại hoàn thành: have/has + already + V3.`,
  },
  {
    topic: 'Present Perfect',
    q: 'We _____ this gaming headset for over two years — it still works perfectly.',
    opts: ['had', 'have had', 'have', 'are having'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "have had"</strong><br><br>
"For over two years" → trạng thái kéo dài từ quá khứ đến nay → hiện tại hoàn thành: have had.`,
  },
  {
    topic: 'Present Perfect',
    q: '_____ you ever _____ to a live esports event?',
    opts: ['Have / been', 'Did / go', 'Had / gone', 'Are / going'],
    ans: 0,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án: "Have / been"</strong><br><br>
"Ever" hỏi về kinh nghiệm → hiện tại hoàn thành. "Have you ever been to..." = Bạn có từng đến... không?`,
  },

  // ── Present Perfect Continuous ─────────────────────────────────────────────
  {
    topic: 'Present Perfect Continuous',
    q: 'She _____ for the same company remotely for five years.',
    opts: ['works', 'worked', 'has been working', 'had worked'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "has been working"</strong><br><br>
Hành động bắt đầu trong quá khứ, vẫn tiếp tục đến hiện tại, nhấn mạnh quá trình → hiện tại hoàn thành tiếp diễn.<br><br>
<strong>Cấu trúc:</strong> S + have/has + been + V-ing`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'They _____ for a new apartment since January.',
    opts: ['look', 'have looked', 'are looking', 'have been looking'],
    ans: 3,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "have been looking"</strong><br><br>
"Since January" → hành động kéo dài, nhấn mạnh sự liên tục đến hiện tại → hiện tại hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'He looks tired. He _____ late every night this week.',
    opts: ['worked', 'works', 'has been working', 'had been working'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "has been working"</strong><br><br>
Kết quả hiện tại (trông mệt) xuất phát từ hành động kéo dài gần đây → hiện tại hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'How long _____ you _____ for the government\'s EV rebate?',
    opts: ['did / wait', 'have / waited', 'have / been waiting', 'are / waiting'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "have / been waiting"</strong><br><br>
"How long" hỏi về khoảng thời gian đang tiếp diễn → hiện tại hoàn thành tiếp diễn: How long + have/has + S + been + V-ing?`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'The developers _____ on this new game for over three years.',
    opts: ['worked', 'are working', 'have been working', 'had worked'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "have been working"</strong><br><br>
"For over three years" + hành động vẫn đang tiếp diễn → hiện tại hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'My eyes are sore because I _____ at a screen all day.',
    opts: ['stared', 'have stared', 'have been staring', 'am staring'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "have been staring"</strong><br><br>
Kết quả hiện tại (mắt đau) do hành động kéo dài → hiện tại hoàn thành tiếp diễn nhấn mạnh quá trình.`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'It _____ all morning — the roads are very wet now.',
    opts: ['rained', 'rains', 'has been raining', 'had rained'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "has been raining"</strong><br><br>
Hành động kéo dài (suốt buổi sáng) tạo ra kết quả hiện tại (đường ướt) → hiện tại hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'She _____ her fitness app for six months and has already lost 8 kg.',
    opts: ['used', 'is using', 'has used', 'has been using'],
    ans: 3,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "has been using"</strong><br><br>
Hành động kéo dài (for six months), nhấn mạnh quá trình liên tục → hiện tại hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'We _____ about switching to solar energy for months now.',
    opts: ['talk', 'talked', 'have talked', 'have been talking'],
    ans: 3,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án: "have been talking"</strong><br><br>
"For months now" + hành động liên tục chưa kết thúc → hiện tại hoàn thành tiếp diễn.`,
  },

  // ── Past Perfect ──────────────────────────────────────────────────────────
  {
    topic: 'Past Perfect',
    q: 'By the time she arrived, the esports final _____ already _____.',
    opts: ['was / starting', 'has / started', 'had / started', 'would / start'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had / started"</strong><br><br>
Hành động xảy ra TRƯỚC một hành động khác trong quá khứ → quá khứ hoàn thành.<br><br>
<strong>Cấu trúc:</strong> S + had + V3/past participle`,
  },
  {
    topic: 'Past Perfect',
    q: 'He bought a new laptop because his old one _____ completely.',
    opts: ['crashed', 'has crashed', 'had crashed', 'was crashing'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had crashed"</strong><br><br>
Laptop hỏng (had crashed) xảy ra trước việc mua máy mới (bought) → quá khứ hoàn thành.`,
  },
  {
    topic: 'Past Perfect',
    q: 'She _____ never _____ an electric car before she test-drove the Model 3.',
    opts: ['has / driven', 'had / driven', 'did / drive', 'was / driving'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had / driven"</strong><br><br>
Kinh nghiệm trước một mốc quá khứ (test-drove) → quá khứ hoàn thành: had + never + V3.`,
  },
  {
    topic: 'Past Perfect',
    q: 'When the doctor called, she _____ already _____ the test results online.',
    opts: ['was / seeing', 'has / seen', 'had / seen', 'would / see'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had / seen"</strong><br><br>
Xem kết quả (had seen) xảy ra trước khi bác sĩ gọi (called) → quá khứ hoàn thành.`,
  },
  {
    topic: 'Past Perfect',
    q: 'The government _____ the subsidy programme before sales really took off.',
    opts: ['launched', 'was launching', 'has launched', 'had launched'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had launched"</strong><br><br>
Chương trình ra mắt (had launched) trước khi doanh số tăng (took off) → quá khứ hoàn thành.`,
  },
  {
    topic: 'Past Perfect',
    q: 'I felt confident in the job interview because I _____ for weeks.',
    opts: ['prepared', 'have prepared', 'had prepared', 'was preparing'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had prepared"</strong><br><br>
Chuẩn bị (had prepared) xảy ra trước buổi phỏng vấn (felt confident) → quá khứ hoàn thành.`,
  },
  {
    topic: 'Past Perfect',
    q: 'After we _____ the podcast, we uploaded it to all platforms.',
    opts: ['have recorded', 'recorded', 'had recorded', 'were recording'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had recorded"</strong><br><br>
"After" + hành động hoàn thành trước (had recorded) → hành động sau (uploaded) → quá khứ hoàn thành trong mệnh đề "after".`,
  },
  {
    topic: 'Past Perfect',
    q: 'By 2024, EV manufacturers _____ the cost of batteries by 60%.',
    opts: ['reduce', 'reduced', 'had reduced', 'have reduced'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had reduced"</strong><br><br>
"By 2024" (trước mốc 2024) → hành động hoàn thành trước mốc đó → quá khứ hoàn thành.`,
  },
  {
    topic: 'Past Perfect',
    q: 'She quit the streaming service because she _____ all the shows she wanted to watch.',
    opts: ['watched', 'has watched', 'had watched', 'was watching'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án: "had watched"</strong><br><br>
Xem hết (had watched) xảy ra trước việc hủy dịch vụ (quit) → quá khứ hoàn thành.`,
  },

  // ── Past Perfect Continuous ───────────────────────────────────────────────
  {
    topic: 'Past Perfect Continuous',
    q: 'She was exhausted because she _____ all night to finish the project.',
    opts: ['worked', 'had worked', 'has been working', 'had been working'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been working"</strong><br><br>
Hành động kéo dài liên tục trong quá khứ, tạo ra kết quả quá khứ (exhausted) → quá khứ hoàn thành tiếp diễn.<br><br>
<strong>Cấu trúc:</strong> S + had been + V-ing`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'By the time the patch was released, players _____ the bug for months.',
    opts: ['reported', 'have reported', 'had been reporting', 'were reporting'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been reporting"</strong><br><br>
Hành động liên tục (reporting bugs) trước một mốc quá khứ (patch released) → quá khứ hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'He lost his voice because he _____ too much during the podcast marathon.',
    opts: ['talked', 'was talking', 'had been talking', 'has been talking'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been talking"</strong><br><br>
Nguyên nhân kéo dài (had been talking) → kết quả (lost his voice) trong quá khứ → quá khứ hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'The engineers _____ on the EV battery design for two years before they found the solution.',
    opts: ['worked', 'were working', 'had worked', 'had been working'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been working"</strong><br><br>
Quá trình kéo dài liên tục (for two years) trước khi tìm ra giải pháp (before they found) → quá khứ hoàn thành tiếp diễn nhấn mạnh sự liên tục.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'She felt much better after she _____ yoga for a few months.',
    opts: ['did', 'was doing', 'had done', 'had been doing'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been doing"</strong><br><br>
Hoạt động kéo dài (for a few months) trước khi cảm thấy tốt hơn → quá khứ hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'When I arrived at the office, they _____ about the new remote work policy all morning.',
    opts: ['talked', 'were talking', 'had talked', 'had been talking'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been talking"</strong><br><br>
Hành động diễn ra liên tục suốt buổi sáng trước khi tôi đến → quá khứ hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'The river was brown because it _____ heavily for several days.',
    opts: ['rained', 'was raining', 'had rained', 'had been raining'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been raining"</strong><br><br>
Nguyên nhân kéo dài (had been raining for days) → kết quả hiện tại trong quá khứ (river was brown) → quá khứ hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'How long _____ she _____ on the same online course before she gave up?',
    opts: ['did / work', 'was / working', 'had / worked', 'had / been working'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had / been working"</strong><br><br>
"How long" + hành động kéo dài trước một mốc quá khứ (gave up) → quá khứ hoàn thành tiếp diễn.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'She needed new shoes because she _____ in the same pair for three years.',
    opts: ['walked', 'was walking', 'had walked', 'had been walking'],
    ans: 3,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án: "had been walking"</strong><br><br>
Hoạt động liên tục "for three years" trước khi mua giày mới → quá khứ hoàn thành tiếp diễn nhấn mạnh quá trình.`,
  },
]

async function main() {
  const batchSize = 20
  for (let i = 0; i < QUESTIONS.length; i += batchSize) {
    const batch = QUESTIONS.slice(i, i + batchSize)
    const { error } = await supabase.from('questions').insert(batch)
    if (error) {
      console.error(`Batch ${i / batchSize + 1} failed:`, error.message)
      process.exit(1)
    }
    console.log(`Batch ${i / batchSize + 1} inserted (${batch.length} questions)`)
  }
  console.log(`Done! ${QUESTIONS.length} questions inserted.`)
}

main()
