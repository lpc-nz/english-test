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
    q: 'YouTube Shorts _____ more than 70 billion views every single day.',
    opts: ['are receiving', 'receives', 'received', 'receive'],
    ans: 3,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án đúng: "receive"</strong><br><br>
Chủ ngữ "YouTube Shorts" là danh từ số nhiều → động từ không thêm -s. Sự thật, số liệu thống kê hiện tại dùng thì hiện tại đơn.<br><br>
<strong>Cấu trúc:</strong> They/We/You/Plural noun + V (nguyên thể)<br>
He/She/It + V-s/es`,
  },
  {
    topic: 'Present Simple',
    q: 'Most Gen Z people _____ their phones to check social media as soon as they wake up.',
    opts: ['are using', 'use', 'used', 'have used'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án đúng: "use"</strong><br><br>
Thói quen lặp lại hàng ngày → dùng thì hiện tại đơn. "As soon as they wake up" xác nhận đây là thói quen thường xuyên.<br><br>
<strong>Trạng từ tần suất phổ biến:</strong> always, usually, often, sometimes, never<br>
Vị trí: đứng sau động từ <em>be</em>, trước động từ thường.`,
  },

  // ── Present Continuous ────────────────────────────────────────────────────
  {
    topic: 'Present Continuous',
    q: 'More and more companies _____ AI tools to create social media content right now.',
    opts: ['use', 'are using', 'used', 'have used'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án đúng: "are using"</strong><br><br>
"Right now" và xu hướng đang thay đổi trong giai đoạn hiện tại → dùng hiện tại tiếp diễn.<br><br>
<strong>Cấu trúc:</strong> S + am/is/are + V-ing<br>
<strong>Tín hiệu nhận biết:</strong> now, right now, at the moment, currently, these days`,
  },
  {
    topic: 'Present Continuous',
    q: 'Young people around the world _____ for stronger climate laws this year.',
    opts: ['fight', 'fought', 'are fighting', 'have fought'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại tiếp diễn</span>
<strong>Đáp án đúng: "are fighting"</strong><br><br>
"This year" chỉ giai đoạn đang diễn ra xung quanh hiện tại → hiện tại tiếp diễn diễn tả hành động tạm thời đang xảy ra.<br><br>
<strong>Lưu ý:</strong> Present continuous còn dùng cho xu hướng đang thay đổi: <em>"The climate is getting warmer."</em>`,
  },

  // ── Stative Verbs ─────────────────────────────────────────────────────────
  {
    topic: 'Stative Verbs',
    q: 'She _____ her new fitness tracking app. It records everything perfectly.',
    opts: ['is loving', 'loves', 'is liking', 'has been loving'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án đúng: "loves"</strong><br><br>
"Love" là stative verb (động từ trạng thái) → <strong>không dùng với -ing</strong> kể cả khi muốn nói về hiện tại.<br><br>
<strong>Stative verbs phổ biến:</strong> love, like, hate, want, need, know, believe, understand, own, seem, appear, prefer, contain, mean`,
  },
  {
    topic: 'Stative Verbs',
    q: 'I _____ how quickly AI is replacing jobs that people used to do.',
    opts: ['am not believing', "don't believe", 'am not beliving', 'not believing'],
    ans: 1,
    expl: `<span class="tag">Động từ trạng thái</span>
<strong>Đáp án đúng: "don't believe"</strong><br><br>
"Believe" là stative verb → không dùng hình thức tiếp diễn (-ing). Dùng hiện tại đơn phủ định: don't/doesn't + V.<br><br>
<strong>Cấu trúc phủ định:</strong> I/You/We/They + <strong>don't</strong> + V / He/She/It + <strong>doesn't</strong> + V`,
  },

  // ── Past Simple ───────────────────────────────────────────────────────────
  {
    topic: 'Past Simple',
    q: 'TikTok _____ its first shopping feature in the United States in 2023.',
    opts: ['launches', 'is launching', 'launched', 'has launched'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án đúng: "launched"</strong><br><br>
"In 2023" là thời điểm xác định trong quá khứ → dùng thì quá khứ đơn.<br><br>
<strong>Tín hiệu nhận biết:</strong> yesterday, last week/month/year, in + năm quá khứ, ago<br>
<strong>Cấu trúc:</strong> S + V-ed / V2 (+) &nbsp;|&nbsp; S + didn't + V (–)`,
  },
  {
    topic: 'Past Simple',
    q: 'Last month, climate activists _____ a major protest in over 50 cities worldwide.',
    opts: ['organize', 'are organizing', 'organized', 'have organized'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án đúng: "organized"</strong><br><br>
"Last month" là mốc thời gian xác định trong quá khứ → quá khứ đơn. Hiện tại hoàn thành (have organized) không dùng với mốc thời gian cụ thể đã kết thúc.`,
  },

  // ── Past Continuous ───────────────────────────────────────────────────────
  {
    topic: 'Past Continuous',
    q: 'She _____ yoga when her phone rang with a breaking news notification.',
    opts: ['practised', 'was practising', 'has practised', 'practises'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án đúng: "was practising"</strong><br><br>
Hành động đang diễn ra liên tục (was practising) bị gián đoạn bởi hành động ngắn (rang) → quá khứ tiếp diễn.<br><br>
<strong>Cấu trúc:</strong> S + was/were + V-ing<br>
<strong>Pattern:</strong> was/were + V-ing (khi...) + when + V-ed (đột ngột)`,
  },
  {
    topic: 'Past Continuous',
    q: 'The engineers _____ the new AI model all night when the server suddenly crashed.',
    opts: ['developed', 'were developing', 'have developed', 'had developed'],
    ans: 1,
    expl: `<span class="tag">Thì quá khứ tiếp diễn</span>
<strong>Đáp án đúng: "were developing"</strong><br><br>
Hành động kéo dài trong quá khứ (all night = suốt đêm) bị gián đoạn bởi "crashed" → were developing.<br><br>
<strong>Lưu ý:</strong> Past continuous cũng dùng khi hai hành động diễn ra song song trong quá khứ:<br>
<em>"While she was posting, he was editing."</em>`,
  },

  // ── Used to ───────────────────────────────────────────────────────────────
  {
    topic: 'Used to',
    q: 'People _____ print maps before GPS became available on smartphones.',
    opts: ['were used to', 'used to', 'are used to', 'would use to'],
    ans: 1,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án đúng: "used to"</strong><br><br>
"Used to + V" diễn tả thói quen hoặc trạng thái trong quá khứ, nay <strong>không còn nữa</strong>.<br><br>
<strong>Phân biệt:</strong><br>
• <em>used to + V</em> = thói quen quá khứ (đã thay đổi)<br>
• <em>be used to + V-ing</em> = quen với việc gì (hiện tại)<br>
• <em>get used to + V-ing</em> = đang dần quen với việc gì`,
  },
  {
    topic: 'Used to',
    q: 'She _____ go to the gym every day, but now she does all her workouts online at home.',
    opts: ['is used to', 'used to', 'was using', 'uses to'],
    ans: 1,
    expl: `<span class="tag">Used to</span>
<strong>Đáp án đúng: "used to"</strong><br><br>
Thói quen trong quá khứ đã thay đổi (now = hiện tại khác với trước) → "used to + V".<br><br>
<strong>Lưu ý:</strong> "Uses to" không tồn tại trong tiếng Anh. Phủ định: "didn't use to". Câu hỏi: "Did you use to...?"`,
  },

  // ── Present Perfect ───────────────────────────────────────────────────────
  {
    topic: 'Present Perfect',
    q: 'Scientists _____ that the past decade was the hottest on record in human history.',
    opts: ['confirmed', 'are confirming', 'have confirmed', 'had confirmed'],
    ans: 2,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án đúng: "have confirmed"</strong><br><br>
Hành động trong quá khứ có kết quả/ý nghĩa quan trọng ở hiện tại → present perfect.<br><br>
<strong>Cấu trúc:</strong> S + have/has + V3<br>
<strong>Trạng từ:</strong> already, yet, just, recently, ever, never, so far`,
  },
  {
    topic: 'Present Perfect',
    q: 'Have you ever _____ an AI tool to help you write or correct your English?',
    opts: ['use', 'used', 'using', 'uses'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án đúng: "used"</strong><br><br>
"Have + ever + V3" hỏi về kinh nghiệm từ trước đến nay → V3 (past participle) bắt buộc sau "have".<br><br>
<strong>Cấu trúc hỏi:</strong> Have/Has + S + ever + V3...?`,
  },

  // ── Present Perfect Continuous ────────────────────────────────────────────
  {
    topic: 'Present Perfect Continuous',
    q: 'She _____ short videos for her TikTok channel for the past two years.',
    opts: ['has been making', 'made', 'makes', 'is making'],
    ans: 0,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án đúng: "has been making"</strong><br><br>
"For the past two years" → hành động bắt đầu trong quá khứ, vẫn đang tiếp tục đến hiện tại, nhấn mạnh tính liên tục → present perfect continuous.<br><br>
<strong>Cấu trúc:</strong> S + have/has + been + V-ing<br>
<strong>Tín hiệu:</strong> for + khoảng thời gian, since + mốc thời gian`,
  },
  {
    topic: 'Present Perfect Continuous',
    q: 'Global temperatures _____ steadily since the early 1980s, according to climate scientists.',
    opts: ['rise', 'have been rising', 'rose', 'are rising'],
    ans: 1,
    expl: `<span class="tag">Thì hiện tại hoàn thành tiếp diễn</span>
<strong>Đáp án đúng: "have been rising"</strong><br><br>
"Since the early 1980s" = từ một mốc thời gian trong quá khứ đến nay → present perfect continuous nhấn mạnh quá trình kéo dài liên tục.<br><br>
<strong>So sánh:</strong> "Temperatures have risen" (kết quả) vs "have been rising" (quá trình đang tiếp diễn)`,
  },

  // ── Past Perfect ──────────────────────────────────────────────────────────
  {
    topic: 'Past Perfect',
    q: 'By the time he joined the new gym, he _____ 8 kilograms by following an online fitness plan.',
    opts: ['lost', 'has lost', 'had lost', 'was losing'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án đúng: "had lost"</strong><br><br>
"By the time + quá khứ đơn" → mệnh đề chính dùng past perfect: hành động xảy ra và hoàn thành TRƯỚC khi anh ấy gia nhập phòng gym.<br><br>
<strong>Cấu trúc:</strong> S + had + V3<br>
<strong>Pattern:</strong> By the time + past simple → past perfect`,
  },
  {
    topic: 'Past Perfect',
    q: 'The influencer _____ the video online before the company could ask her to remove it.',
    opts: ['already posted', 'has already posted', 'had already posted', 'already posts'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án đúng: "had already posted"</strong><br><br>
Đã đăng video (trước) → công ty mới yêu cầu gỡ (sau). Hành động xảy ra trước dùng past perfect.<br><br>
<strong>"Already" trong past perfect</strong> đứng giữa had và V3: <em>had already + V3</em>`,
  },

  // ── Past Perfect Continuous ───────────────────────────────────────────────
  {
    topic: 'Past Perfect Continuous',
    q: 'The development team _____ on the new AI model for six months before they finally released it.',
    opts: ['worked', 'was working', 'had been working', 'has been working'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án đúng: "had been working"</strong><br><br>
Hành động kéo dài liên tục (for six months) trước một thời điểm trong quá khứ (released) → past perfect continuous.<br><br>
<strong>Cấu trúc:</strong> S + had been + V-ing<br>
Nhấn mạnh <strong>quá trình</strong> kéo dài trước một sự kiện quá khứ.`,
  },
  {
    topic: 'Past Perfect Continuous',
    q: 'He felt completely exhausted because he _____ at the gym for almost three hours.',
    opts: ['trained', 'was training', 'had been training', 'has been training'],
    ans: 2,
    expl: `<span class="tag">Thì quá khứ hoàn thành tiếp diễn</span>
<strong>Đáp án đúng: "had been training"</strong><br><br>
"Had been training" giải thích <strong>nguyên nhân</strong> (tập luyện liên tục) dẫn đến <strong>kết quả</strong> trong quá khứ (felt exhausted) → past perfect continuous.<br><br>
<strong>So sánh:</strong> "was training" không nêu rõ sự kiện training đã kết thúc trước "felt".`,
  },

  // ── Future: will ──────────────────────────────────────────────────────────
  {
    topic: 'Future Forms',
    q: 'Experts predict that AI _____ completely change the way most people work within ten years.',
    opts: ['changes', 'is changing', 'will', 'changed'],
    ans: 2,
    expl: `<span class="tag">Tương lai với "will"</span>
<strong>Đáp án đúng: "will"</strong><br><br>
Dự đoán về tương lai không có bằng chứng cụ thể ngay lúc nói → dùng "will + V".<br><br>
<strong>Cách dùng của "will":</strong><br>
1. Dự đoán (prediction): <em>"It will rain tomorrow."</em><br>
2. Quyết định tức thì (spontaneous): <em>"I'll help you."</em><br>
3. Lời hứa: <em>"I'll call you later."</em>`,
  },

  // ── Future: be going to ───────────────────────────────────────────────────
  {
    topic: 'Future Forms',
    q: 'The city _____ plant one million trees next year. The plan was announced last month.',
    opts: ['will plant', 'is going to plant', 'plants', 'planted'],
    ans: 1,
    expl: `<span class="tag">Tương lai với "be going to"</span>
<strong>Đáp án đúng: "is going to plant"</strong><br><br>
Kế hoạch đã được quyết định từ trước (announced last month) → dùng "be going to", KHÔNG dùng "will" (will dùng cho quyết định tức thì).<br><br>
<strong>Be going to còn dùng cho:</strong> dự đoán có bằng chứng rõ ràng: <em>"Look at those clouds — it's going to rain."</em>`,
  },

  // ── Future: Present Continuous ────────────────────────────────────────────
  {
    topic: 'Future Forms',
    q: 'She _____ a half-marathon next Sunday. She registered and paid her fee three months ago.',
    opts: ['runs', 'will run', 'is running', 'is going to run'],
    ans: 2,
    expl: `<span class="tag">Tương lai với hiện tại tiếp diễn</span>
<strong>Đáp án đúng: "is running"</strong><br><br>
Sự kiện đã được <strong>sắp xếp, lên kế hoạch cụ thể</strong> (đã đăng ký, đã đặt lịch) → present continuous diễn tả tương lai đã chắc chắn.<br><br>
<strong>So sánh:</strong> "be going to" = kế hoạch chung. Present continuous = đã có lịch hẹn, đã đặt chỗ cụ thể.`,
  },

  // ── Future: Present Simple ────────────────────────────────────────────────
  {
    topic: 'Future Forms',
    q: 'The new software update _____ at midnight tonight. It is listed on the official schedule.',
    opts: ['will go live', 'goes live', 'is going live', 'is going to go live'],
    ans: 1,
    expl: `<span class="tag">Tương lai với hiện tại đơn</span>
<strong>Đáp án đúng: "goes live"</strong><br><br>
Lịch trình cố định, thời gian biểu chính thức (official schedule) → dùng <strong>hiện tại đơn</strong> cho sự kiện tương lai đã được lên lịch chắc chắn.<br><br>
<strong>Thường gặp với:</strong> tàu xe, chuyến bay, lịch phát sóng, sự kiện chính thức`,
  },

  // ── Prepositions of Time and Place ────────────────────────────────────────
  {
    topic: 'Prepositions of Time and Place',
    q: 'The morning yoga class starts _____ 7 o\'clock _____ the morning.',
    opts: ['in / at', 'at / in', 'on / in', 'at / on'],
    ans: 1,
    expl: `<span class="tag">Giới từ thời gian</span>
<strong>Đáp án đúng: "at / in"</strong><br><br>
• <strong>at</strong> + giờ cụ thể: <em>at 7 o'clock, at noon, at midnight</em><br>
• <strong>in</strong> + buổi trong ngày: <em>in the morning, in the afternoon, in the evening</em><br>
• <strong>on</strong> + ngày/thứ: <em>on Monday, on 15th May</em>`,
  },
  {
    topic: 'Prepositions of Time and Place',
    q: 'The global climate summit is taking place _____ Geneva _____ June this year.',
    opts: ['in / in', 'at / in', 'on / at', 'in / at'],
    ans: 0,
    expl: `<span class="tag">Giới từ thời gian và nơi chốn</span>
<strong>Đáp án đúng: "in / in"</strong><br><br>
• <strong>in</strong> + thành phố/quốc gia/châu lục: <em>in Geneva, in Vietnam, in Asia</em><br>
• <strong>in</strong> + tháng: <em>in June, in March</em><br>
• <strong>at</strong> + địa điểm cụ thể (điểm): <em>at the airport, at school</em>`,
  },

  // ── Passive Voice ─────────────────────────────────────────────────────────
  {
    topic: 'Passive Voice',
    q: 'Millions of short videos _____ every single day on TikTok and Instagram Reels.',
    opts: ['upload', 'are uploaded', 'is uploaded', 'were uploaded'],
    ans: 1,
    expl: `<span class="tag">Câu bị động – Hiện tại đơn</span>
<strong>Đáp án đúng: "are uploaded"</strong><br><br>
Câu bị động hiện tại đơn: <strong>am/is/are + V3</strong>. "Millions of videos" = chủ ngữ số nhiều → "are uploaded".<br><br>
<strong>Khi nào dùng bị động?</strong> Khi không biết / không quan trọng ai thực hiện hành động.`,
  },
  {
    topic: 'Passive Voice',
    q: 'ChatGPT _____ to the public in November 2022 and quickly became a global sensation.',
    opts: ['released', 'was released', 'has been released', 'is released'],
    ans: 1,
    expl: `<span class="tag">Câu bị động – Quá khứ đơn</span>
<strong>Đáp án đúng: "was released"</strong><br><br>
Câu bị động quá khứ đơn: <strong>was/were + V3</strong>. "In November 2022" = thời điểm xác định → quá khứ đơn.<br><br>
<strong>Cấu trúc:</strong> S + was/were + V3 + (by + agent)`,
  },
  {
    topic: 'Passive Voice',
    q: 'New electric buses _____ in all major cities in the country by 2027.',
    opts: ['will introduce', 'will be introduced', 'are introduced', 'have been introduced'],
    ans: 1,
    expl: `<span class="tag">Câu bị động – Tương lai</span>
<strong>Đáp án đúng: "will be introduced"</strong><br><br>
Câu bị động tương lai: <strong>will be + V3</strong>. "By 2027" là mốc thời gian tương lai.<br><br>
<strong>Cấu trúc:</strong> S + will be + V3`,
  },
  {
    topic: 'Passive Voice',
    q: 'Dozens of new AI apps _____ by developers around the world at this very moment.',
    opts: ['are tested', 'are being tested', 'were tested', 'have been tested'],
    ans: 1,
    expl: `<span class="tag">Câu bị động – Hiện tại tiếp diễn</span>
<strong>Đáp án đúng: "are being tested"</strong><br><br>
Câu bị động tiếp diễn: <strong>am/is/are + being + V3</strong>. "At this very moment" = đang xảy ra ngay lúc này.<br><br>
<strong>Phân biệt:</strong> "are tested" (hiện tại đơn bị động) vs "are being tested" (tiếp diễn bị động)`,
  },
  {
    topic: 'Passive Voice',
    q: 'A new international climate agreement _____ by most world leaders at this year\'s summit.',
    opts: ['signed', 'has signed', 'has been signed', 'is signed'],
    ans: 2,
    expl: `<span class="tag">Câu bị động – Hiện tại hoàn thành</span>
<strong>Đáp án đúng: "has been signed"</strong><br><br>
Câu bị động hiện tại hoàn thành: <strong>have/has + been + V3</strong>. "This year's summit" = kết quả vừa có ý nghĩa ở hiện tại.<br><br>
<strong>Cấu trúc:</strong> S + have/has + been + V3`,
  },

  // ── Countable and Uncountable Nouns ───────────────────────────────────────
  {
    topic: 'Countable and Uncountable Nouns',
    q: 'My personal trainer gave me some excellent _____ about improving my diet.',
    opts: ['advices', 'advice', 'an advice', 'advise'],
    ans: 1,
    expl: `<span class="tag">Danh từ không đếm được</span>
<strong>Đáp án đúng: "advice"</strong><br><br>
"Advice" là danh từ <strong>không đếm được</strong> → không thêm -s, không dùng a/an.<br><br>
<strong>Cách dùng đúng:</strong> some advice, a piece of advice, much advice<br>
<strong>Các từ tương tự:</strong> information, news, knowledge, research, furniture, equipment`,
  },
  {
    topic: 'Countable and Uncountable Nouns',
    q: 'We need to reduce the amount of _____ we produce every day to protect the environment.',
    opts: ['wastes', 'waste', 'a waste', 'wasting'],
    ans: 1,
    expl: `<span class="tag">Danh từ không đếm được</span>
<strong>Đáp án đúng: "waste"</strong><br><br>
"Waste" (rác thải, chất thải) là danh từ không đếm được → không thêm -s. Dùng "amount of" trước danh từ không đếm được.<br><br>
<strong>So sánh:</strong> "amount of" + uncountable noun / "number of" + countable noun`,
  },

  // ── Articles ──────────────────────────────────────────────────────────────
  {
    topic: 'Articles',
    q: 'She works for _____ AI startup that builds chatbot tools for small businesses.',
    opts: ['a', 'an', 'the', '—'],
    ans: 1,
    expl: `<span class="tag">Mạo từ "an"</span>
<strong>Đáp án đúng: "an"</strong><br><br>
"AI" phát âm là /eɪ.aɪ/ → bắt đầu bằng <strong>âm nguyên âm</strong> /eɪ/ → dùng <strong>"an"</strong>, không phải "a".<br><br>
<strong>Quy tắc:</strong> Dùng "an" trước từ bắt đầu bằng ÂM nguyên âm (không phải chữ nguyên âm).<br>
Ví dụ: an hour /aʊər/, a university /juː/, an MBA, a European`,
  },
  {
    topic: 'Articles',
    q: 'Did you watch _____ video about climate change that went viral on YouTube last week?',
    opts: ['a', 'an', 'the', '—'],
    ans: 2,
    expl: `<span class="tag">Mạo từ "the"</span>
<strong>Đáp án đúng: "the"</strong><br><br>
Dùng "the" khi người nghe biết đề cập đến <strong>cái cụ thể</strong> nào. Ở đây mệnh đề quan hệ "that went viral" xác định rõ video nào → dùng "the".<br><br>
<strong>Quy tắc:</strong> the = đã biết, đã xác định; a/an = lần đầu đề cập, chưa xác định`,
  },
  {
    topic: 'Articles',
    q: '_____ yoga has become extremely popular among young professionals in 2026.',
    opts: ['A', 'An', 'The', '—'],
    ans: 3,
    expl: `<span class="tag">Không dùng mạo từ (Zero article)</span>
<strong>Đáp án đúng: "—" (không có mạo từ)</strong><br><br>
Danh từ không đếm được theo nghĩa <strong>tổng quát</strong> → không dùng mạo từ.<br><br>
<strong>So sánh:</strong><br>
• "Yoga is popular." (tổng quát → không có the/a)<br>
• "The yoga we did in class was hard." (yoga cụ thể → dùng the)`,
  },

  // ── Pronouns ──────────────────────────────────────────────────────────────
  {
    topic: 'Pronouns',
    q: 'The company launched a new fitness app last month. _____ became the most downloaded app within a week.',
    opts: ['He', 'She', 'It', 'They'],
    ans: 2,
    expl: `<span class="tag">Đại từ nhân xưng</span>
<strong>Đáp án đúng: "It"</strong><br><br>
"App" là đồ vật → dùng đại từ <strong>"it"</strong> (không phải he/she). "They" dùng cho danh từ số nhiều.<br><br>
<strong>Quy tắc:</strong> he/she = người; it = vật/động vật (không xác định giới tính); they = số nhiều`,
  },

  // ── Possessive Determiners ────────────────────────────────────────────────
  {
    topic: 'Possessive Determiners',
    q: 'Many Gen Z people use a smartwatch to track _____ daily health and fitness data.',
    opts: ['they', 'their', 'them', 'theirs'],
    ans: 1,
    expl: `<span class="tag">Tính từ sở hữu</span>
<strong>Đáp án đúng: "their"</strong><br><br>
Đứng trước danh từ "health and fitness data" cần <strong>tính từ sở hữu</strong> → "their".<br><br>
<strong>Phân biệt:</strong><br>
• <em>their</em> + noun = tính từ sở hữu (trước danh từ)<br>
• <em>theirs</em> = đại từ sở hữu (đứng một mình, không có noun sau)<br>
• <em>them</em> = tân ngữ`,
  },

  // ── Relative Clauses ──────────────────────────────────────────────────────
  {
    topic: 'Relative Clauses',
    q: 'The young scientist _____ developed the new carbon-capture technology won a global award.',
    opts: ['which', 'whose', 'who', 'what'],
    ans: 2,
    expl: `<span class="tag">Mệnh đề quan hệ xác định</span>
<strong>Đáp án đúng: "who"</strong><br><br>
Mệnh đề quan hệ xác định (defining) thay thế cho người → dùng <strong>"who"</strong>.<br><br>
<strong>Quy tắc:</strong><br>
• who = người (chủ ngữ)<br>
• which = vật/sự việc<br>
• whose = sở hữu (của người/vật)<br>
• that = người hoặc vật (trong mệnh đề xác định)`,
  },
  {
    topic: 'Relative Clauses',
    q: 'ChatGPT, _____ was launched in late 2022, has changed the way millions of people work.',
    opts: ['who', 'which', 'that', 'what'],
    ans: 1,
    expl: `<span class="tag">Mệnh đề quan hệ không xác định</span>
<strong>Đáp án đúng: "which"</strong><br><br>
Mệnh đề quan hệ không xác định (non-defining) về vật, đứng sau dấu phẩy → dùng <strong>"which"</strong>. Không dùng "that" sau dấu phẩy.<br><br>
<strong>Lưu ý:</strong> Mệnh đề không xác định có dấu phẩy và cung cấp thông tin bổ sung, không thể bỏ qua mà làm thay đổi nghĩa câu.`,
  },

  // ── Reduced Relative Clauses ──────────────────────────────────────────────
  {
    topic: 'Reduced Relative Clauses',
    q: 'The short video _____ by the young climate activist got over 20 million views in one day.',
    opts: ['uploaded', 'which uploaded', 'who uploaded', 'that uploading'],
    ans: 0,
    expl: `<span class="tag">Mệnh đề quan hệ rút gọn – bị động</span>
<strong>Đáp án đúng: "uploaded"</strong><br><br>
Rút gọn mệnh đề quan hệ bị động: bỏ "which was" → giữ <strong>V3 (past participle)</strong>.<br><br>
<strong>Cấu trúc rút gọn:</strong><br>
• Chủ động: "the man <em>running</em> in the park" (← who is running)<br>
• Bị động: "the video <em>uploaded</em> by her" (← which was uploaded)`,
  },

  // ── Modals ────────────────────────────────────────────────────────────────
  {
    topic: 'Modals',
    q: 'With modern AI tools, almost anyone _____ now create a professional video without any experience.',
    opts: ['should', 'must', 'can', 'will'],
    ans: 2,
    expl: `<span class="tag">Modal – Khả năng (Ability)</span>
<strong>Đáp án đúng: "can"</strong><br><br>
"Can" diễn tả <strong>khả năng</strong> ở hiện tại. "Could" = khả năng trong quá khứ hoặc lịch sự.<br><br>
<strong>Phân biệt:</strong> can (khả năng) vs must (bắt buộc) vs should (lời khuyên)`,
  },
  {
    topic: 'Modals',
    q: 'Students _____ post photos of other students online without getting their permission first.',
    opts: ["can't", "don't have to", "might not", "needn't"],
    ans: 0,
    expl: `<span class="tag">Modal – Sự cho phép (Permission)</span>
<strong>Đáp án đúng: "can't"</strong><br><br>
"Can't" = không được phép (cấm). <br><br>
<strong>Phân biệt:</strong><br>
• <em>can't / mustn't</em> = bị cấm, không được phép<br>
• <em>don't have to / needn't</em> = không cần thiết (nhưng vẫn được phép nếu muốn)`,
  },
  {
    topic: 'Modals',
    q: 'You look exhausted. You _____ try the Japanese walking technique — it\'s very relaxing.',
    opts: ['must', 'should', 'have to', 'shall'],
    ans: 1,
    expl: `<span class="tag">Modal – Lời khuyên (Advice)</span>
<strong>Đáp án đúng: "should"</strong><br><br>
"Should" diễn tả <strong>lời khuyên</strong> nhẹ nhàng, gợi ý. "Must" quá mạnh (bắt buộc). "Have to" = nghĩa vụ từ bên ngoài.<br><br>
<strong>Mức độ:</strong> should (nhẹ) < must (mạnh) < have to (từ quy định bên ngoài)`,
  },
  {
    topic: 'Modals',
    q: 'All factories _____ cut their carbon emissions by at least 40% under the new environmental law.',
    opts: ['should', 'might', 'must', 'can'],
    ans: 2,
    expl: `<span class="tag">Modal – Nghĩa vụ (Obligation)</span>
<strong>Đáp án đúng: "must"</strong><br><br>
"Must" diễn tả <strong>nghĩa vụ bắt buộc</strong>, đặc biệt từ quy định, luật pháp. "Have to" cũng đúng trong ngữ cảnh này.<br><br>
<strong>Phân biệt:</strong> must (chủ quan, từ người nói) vs have to (khách quan, từ bên ngoài)`,
  },
  {
    topic: 'Modals',
    q: 'The new software update _____ cause some older phones to run more slowly for a few days.',
    opts: ['should', 'must', 'might', "can't"],
    ans: 2,
    expl: `<span class="tag">Modal – Khả năng (Possibility)</span>
<strong>Đáp án đúng: "might"</strong><br><br>
"Might" diễn tả <strong>khả năng có thể xảy ra</strong> nhưng không chắc chắn (~50% hoặc ít hơn).<br><br>
<strong>Mức độ chắc chắn:</strong><br>
must (rất chắc ~95%) > should (~80%) > may (~50%) > might (~30%) > can't (chắc chắn không)`,
  },
  {
    topic: 'Modals',
    q: 'She has been training six days a week for a year. She _____ be in incredible shape by now.',
    opts: ['might', 'must', 'should', 'can'],
    ans: 1,
    expl: `<span class="tag">Modal – Mức độ chắc chắn (Degrees of Certainty)</span>
<strong>Đáp án đúng: "must"</strong><br><br>
"Must" diễn tả <strong>suy luận logic chắc chắn cao</strong> dựa trên bằng chứng (tập 6 ngày/tuần suốt 1 năm → chắc chắn đang rất khỏe).<br><br>
<strong>Phân biệt:</strong> must be (chắc chắn ~95%) vs might be (có thể, khoảng 30-50%)`,
  },
  {
    topic: 'Modals',
    q: 'She posted her home address on social media. She _____ have been so careless with her privacy.',
    opts: ['must', 'should', 'might', 'can'],
    ans: 1,
    expl: `<span class="tag">Modal – Chỉ trích (Criticism)</span>
<strong>Đáp án đúng: "should"</strong><br><br>
"Should + not + have + V3" = lẽ ra không nên làm nhưng đã làm → <strong>chỉ trích hành động trong quá khứ</strong>.<br><br>
<strong>Cấu trúc:</strong> should (not) have + V3<br>
<em>"She shouldn't have been so careless."</em> = Cô ấy lẽ ra không nên bất cẩn như vậy.`,
  },

  // ── Modal Perfect ─────────────────────────────────────────────────────────
  {
    topic: 'Modal Perfect',
    q: 'The government _____ acted on climate change twenty years ago. Now it\'s much harder to fix.',
    opts: ['must have', 'could have', 'should have', 'might have'],
    ans: 2,
    expl: `<span class="tag">Modal perfect – Tiếc nuối/Chỉ trích</span>
<strong>Đáp án đúng: "should have"</strong><br><br>
"Should have + V3" = lẽ ra phải làm (nhưng không làm) → tiếc nuối hoặc chỉ trích về quá khứ.<br><br>
<strong>So sánh modal perfect:</strong><br>
• <em>should have done</em> = lẽ ra phải làm<br>
• <em>could have done</em> = lẽ ra có thể làm (nhưng không làm)<br>
• <em>must have done</em> = chắc đã làm (suy luận)<br>
• <em>might have done</em> = có thể đã làm (không chắc)`,
  },

  // ── Questions ─────────────────────────────────────────────────────────────
  {
    topic: 'Questions',
    q: '_____ you ever tried using an AI chatbot to help you practise your English?',
    opts: ['Did', 'Are', 'Have', 'Do'],
    ans: 2,
    expl: `<span class="tag">Câu hỏi – Hiện tại hoàn thành</span>
<strong>Đáp án đúng: "Have"</strong><br><br>
"Ever" hỏi về kinh nghiệm từ trước đến nay → dùng present perfect.<br><br>
<strong>Cấu trúc:</strong> Have/Has + S + ever + V3?<br>
<em>"Have you ever visited another country?"</em>`,
  },

  // ── Question Tags ─────────────────────────────────────────────────────────
  {
    topic: 'Question Tags',
    q: 'The gym opens at 6 AM on weekdays, _____?',
    opts: ["doesn't it", "isn't it", 'does it', 'is it'],
    ans: 0,
    expl: `<span class="tag">Question Tags</span>
<strong>Đáp án đúng: "doesn't it"</strong><br><br>
Câu <strong>khẳng định</strong> → question tag <strong>phủ định</strong>. "The gym opens" = hiện tại đơn, chủ ngữ "it" → dùng "doesn't it".<br><br>
<strong>Quy tắc:</strong><br>
• Câu khẳng định → tag phủ định<br>
• Câu phủ định → tag khẳng định<br>
• Dùng cùng thì và trợ động từ với mệnh đề chính`,
  },
  {
    topic: 'Question Tags',
    q: 'You haven\'t downloaded the new TikTok update yet, _____?',
    opts: ['have you', "haven't you", 'did you', 'do you'],
    ans: 0,
    expl: `<span class="tag">Question Tags</span>
<strong>Đáp án đúng: "have you"</strong><br><br>
Câu <strong>phủ định</strong> (haven't) → question tag <strong>khẳng định</strong>. Dùng cùng trợ động từ "have" → "have you".<br><br>
<strong>Lưu ý:</strong> Không thêm -n't vào question tag của câu phủ định.`,
  },

  // ── Indirect Questions ────────────────────────────────────────────────────
  {
    topic: 'Indirect Questions',
    q: 'Could you tell me where _____ the privacy settings on this social media app?',
    opts: ['are', 'I can find', 'can I find', 'is finding'],
    ans: 1,
    expl: `<span class="tag">Câu hỏi gián tiếp</span>
<strong>Đáp án đúng: "I can find"</strong><br><br>
Trong câu hỏi gián tiếp (indirect question), <strong>trật tự từ là S + V</strong> (không đảo ngữ như câu hỏi trực tiếp).<br><br>
<strong>So sánh:</strong><br>
• Trực tiếp: "Where <em>can I find</em> the settings?" (đảo ngữ)<br>
• Gián tiếp: "Could you tell me where <em>I can find</em> the settings?" (không đảo ngữ)`,
  },

  // ── So and Such ───────────────────────────────────────────────────────────
  {
    topic: 'So and Such',
    q: 'It was _____ a powerful documentary about ocean pollution that it moved millions of viewers to tears.',
    opts: ['so', 'such', 'too', 'very'],
    ans: 1,
    expl: `<span class="tag">So and Such</span>
<strong>Đáp án đúng: "such"</strong><br><br>
<strong>Such + a/an + adj + noun</strong>: "such a powerful documentary"<br>
<strong>So + adj</strong> (không có noun): "It was so powerful that..."<br><br>
<strong>Cấu trúc:</strong><br>
• such + (a/an) + adj + noun + that<br>
• so + adj/adv + that`,
  },

  // ── Too and Enough ────────────────────────────────────────────────────────
  {
    topic: 'Too and Enough',
    q: 'The weights were _____ heavy for her to lift safely without a personal trainer.',
    opts: ['enough', 'such', 'so', 'too'],
    ans: 3,
    expl: `<span class="tag">Too and Enough</span>
<strong>Đáp án đúng: "too"</strong><br><br>
"Too + adj" = quá mức, có <strong>kết quả tiêu cực</strong>: "too heavy to lift" = quá nặng đến mức không thể nhấc lên.<br><br>
<strong>Cấu trúc:</strong> too + adj + (for sb) + to-V<br>
<em>"The bag is too heavy for me to carry."</em>`,
  },
  {
    topic: 'Too and Enough',
    q: 'The electric car\'s battery wasn\'t _____ to reach the next charging station.',
    opts: ['too charged', 'enough charged', 'charged enough', 'so charged'],
    ans: 2,
    expl: `<span class="tag">Too and Enough</span>
<strong>Đáp án đúng: "charged enough"</strong><br><br>
"Adj + <strong>enough</strong>" = đủ để làm gì. Vị trí: <strong>tính từ đứng TRƯỚC enough</strong>.<br><br>
<strong>Cấu trúc:</strong> adj + enough + (for sb) + to-V<br>
<em>"She is tall enough to reach the shelf."</em><br>
⚠️ "Enough" đứng TRƯỚC danh từ: "enough time", "enough money"`,
  },

  // ── Comparatives ─────────────────────────────────────────────────────────
  {
    topic: 'Comparatives',
    q: 'AI tools today are far _____ than they were just two years ago.',
    opts: ['more powerful', 'the most powerful', 'most powerful', 'powerfuller'],
    ans: 0,
    expl: `<span class="tag">So sánh hơn (Comparatives)</span>
<strong>Đáp án đúng: "more powerful"</strong><br><br>
Tính từ có nhiều âm tiết (powerful = 3 âm tiết) → dùng <strong>more + adj</strong> để so sánh hơn.<br><br>
<strong>Quy tắc:</strong><br>
• 1 âm tiết: thêm <em>-er</em>: fast → faster<br>
• 2+ âm tiết: <em>more + adj</em>: more popular, more intelligent<br>
"Far" tăng cường so sánh: <em>far better, far more expensive</em>`,
  },

  // ── Superlatives ─────────────────────────────────────────────────────────
  {
    topic: 'Superlatives',
    q: 'TikTok is one of _____ social media platforms for reaching young people globally.',
    opts: ['most effective', 'the most effective', 'more effective', 'the more effective'],
    ans: 1,
    expl: `<span class="tag">So sánh nhất (Superlatives)</span>
<strong>Đáp án đúng: "the most effective"</strong><br><br>
Superlative = <strong>the most + adj</strong> (tính từ dài). Luôn có "the" trước.<br><br>
<strong>Lưu ý:</strong> "One of the most + adj + plural noun" = một trong những...<br>
<em>"One of the most effective platforms"</em> (platforms = số nhiều)`,
  },

  // ── Conditionals ─────────────────────────────────────────────────────────
  {
    topic: 'Zero Conditional',
    q: 'If you leave plastic waste in the ocean, it _____ into tiny pieces and enters the food chain.',
    opts: ['would break', 'breaks', 'broke', 'will break'],
    ans: 1,
    expl: `<span class="tag">Câu điều kiện loại 0 (Zero Conditional)</span>
<strong>Đáp án đúng: "breaks"</strong><br><br>
Zero conditional = <strong>sự thật hiển nhiên, quy luật tự nhiên, khoa học</strong>.<br><br>
<strong>Cấu trúc:</strong> If + hiện tại đơn → hiện tại đơn<br>
<em>"If you heat water to 100°C, it boils."</em>`,
  },
  {
    topic: 'First Conditional',
    q: 'If social media companies _____ all AI-generated content clearly, users will trust them more.',
    opts: ['label', 'will label', 'labelled', 'would label'],
    ans: 0,
    expl: `<span class="tag">Câu điều kiện loại 1 (First Conditional)</span>
<strong>Đáp án đúng: "label"</strong><br><br>
First conditional = điều kiện <strong>có thể thực sự xảy ra</strong> trong tương lai.<br><br>
<strong>Cấu trúc:</strong> If + hiện tại đơn → will + V<br>
⚠️ Mệnh đề If không dùng "will": ~~"If they will label"~~`,
  },
  {
    topic: 'Second Conditional',
    q: 'If every country _____ to zero emissions tomorrow, temperatures would still keep rising for years.',
    opts: ['switches', 'switched', 'had switched', 'will switch'],
    ans: 1,
    expl: `<span class="tag">Câu điều kiện loại 2 (Second Conditional)</span>
<strong>Đáp án đúng: "switched"</strong><br><br>
Second conditional = giả định <strong>không có thật hoặc rất khó xảy ra</strong> ở hiện tại/tương lai.<br><br>
<strong>Cấu trúc:</strong> If + V-ed/were → would + V<br>
<em>"If I were the president, I would invest more in green energy."</em>`,
  },
  {
    topic: 'Third Conditional',
    q: 'If she _____ more consistently last year, she would have completed the marathon.',
    opts: ['trains', 'trained', 'had trained', 'would train'],
    ans: 2,
    expl: `<span class="tag">Câu điều kiện loại 3 (Third Conditional)</span>
<strong>Đáp án đúng: "had trained"</strong><br><br>
Third conditional = giả định <strong>không có thật trong quá khứ</strong>.<br><br>
<strong>Cấu trúc:</strong> If + had + V3 → would have + V3<br>
<em>"If she had studied harder, she would have passed."</em>`,
  },
  {
    topic: 'Mixed Conditional',
    q: 'If AI technology hadn\'t been invented, our lives _____ very different today.',
    opts: ['are', 'would be', 'will be', 'would have been'],
    ans: 1,
    expl: `<span class="tag">Câu điều kiện hỗn hợp (Mixed Conditional)</span>
<strong>Đáp án đúng: "would be"</strong><br><br>
Mixed conditional: điều kiện giả định trong <strong>quá khứ</strong> nhưng kết quả ảnh hưởng đến <strong>hiện tại</strong>.<br><br>
<strong>Cấu trúc:</strong> If + had + V3 (quá khứ) → would + V (hiện tại)<br>
<em>"If I had studied medicine, I would be a doctor now."</em>`,
  },

  // ── Inverted Conditionals ─────────────────────────────────────────────────
  {
    topic: 'Inverted Conditionals',
    q: '_____ world leaders acted sooner on climate change, many species could have been saved.',
    opts: ['Should', 'If', 'Had', 'Were'],
    ans: 2,
    expl: `<span class="tag">Đảo ngữ câu điều kiện</span>
<strong>Đáp án đúng: "Had"</strong><br><br>
Đảo ngữ điều kiện loại 3: <strong>Had + S + V3...</strong> thay cho "If + S + had + V3"<br><br>
<strong>Ba dạng đảo ngữ:</strong><br>
• Loại 1: <em>Should + S + V</em> (= If + S + should + V)<br>
• Loại 2: <em>Were + S + to-V / Were it...</em><br>
• Loại 3: <em>Had + S + V3</em>`,
  },

  // ── Unless / In case / As long as ────────────────────────────────────────
  {
    topic: 'Unless / In case / As long as / Provided that',
    q: 'You can use the gym facilities at any time _____ you have a valid membership card.',
    opts: ['unless', 'in case', 'as long as', 'even if'],
    ans: 2,
    expl: `<span class="tag">As long as / Unless / In case</span>
<strong>Đáp án đúng: "as long as"</strong><br><br>
"As long as" = <strong>miễn là, với điều kiện là</strong> (điều kiện cần có).<br><br>
<strong>Phân biệt:</strong><br>
• <em>as long as / provided that</em> = miễn là (điều kiện)<br>
• <em>unless</em> = trừ khi (= if not)<br>
• <em>in case</em> = phòng khi (hành động dự phòng)`,
  },
  {
    topic: 'Unless / In case / As long as / Provided that',
    q: 'Always save your work every few minutes _____ the computer crashes unexpectedly.',
    opts: ['unless', 'as long as', 'in case', 'provided that'],
    ans: 2,
    expl: `<span class="tag">In case</span>
<strong>Đáp án đúng: "in case"</strong><br><br>
"In case" = <strong>phòng khi, đề phòng</strong>. Diễn tả hành động thực hiện để chuẩn bị cho một tình huống có thể xảy ra.<br><br>
<em>"Take an umbrella in case it rains."</em> = Mang ô phòng khi trời mưa.<br>
<em>"Unless it rains"</em> = trừ khi trời mưa (nghĩa khác).`,
  },

  // ── Reported Speech ───────────────────────────────────────────────────────
  {
    topic: 'Reported Speech',
    q: 'The tech expert said, "AI will create millions of new jobs." → The expert said that AI _____ millions of new jobs.',
    opts: ['will create', 'would create', 'creates', 'created'],
    ans: 1,
    expl: `<span class="tag">Câu tường thuật – Backshift</span>
<strong>Đáp án đúng: "would create"</strong><br><br>
Backshift (lùi thì) trong reported speech sau "said":<br>
will → <strong>would</strong><br><br>
<strong>Bảng lùi thì:</strong><br>
present simple → past simple<br>
present continuous → past continuous<br>
will → would &nbsp;|&nbsp; can → could &nbsp;|&nbsp; may → might`,
  },

  // ── Reported Questions ────────────────────────────────────────────────────
  {
    topic: 'Reported Questions',
    q: 'The journalist asked me, "Have you signed the online petition?" → She asked me _____ the petition.',
    opts: ['if I have signed', 'whether I had signed', 'that I had signed', 'if had I signed'],
    ans: 1,
    expl: `<span class="tag">Câu hỏi tường thuật</span>
<strong>Đáp án đúng: "whether I had signed"</strong><br><br>
Yes/No question → reported question dùng <strong>whether/if + S + V</strong> (không đảo ngữ, lùi thì).<br><br>
have signed → <strong>had signed</strong> (backshift)<br>
Trật tự từ: whether + S + V (không phải whether + V + S)`,
  },

  // ── Reporting Verbs ───────────────────────────────────────────────────────
  {
    topic: 'Reporting Verbs',
    q: 'The fitness coach _____ doing 30 minutes of low-intensity exercise every morning.',
    opts: ['said to do', 'suggested to do', 'suggested doing', 'told doing'],
    ans: 2,
    expl: `<span class="tag">Động từ tường thuật (Reporting Verbs)</span>
<strong>Đáp án đúng: "suggested doing"</strong><br><br>
"Suggest" + <strong>V-ing</strong> (không dùng to-V).<br><br>
<strong>Một số reporting verbs và cấu trúc:</strong><br>
• suggest/recommend + V-ing<br>
• advise/encourage/persuade + sb + to-V<br>
• say + (that) + clause<br>
• tell + sb + (that) + clause`,
  },

  // ── Direct and Indirect Objects ───────────────────────────────────────────
  {
    topic: 'Direct and Indirect Objects',
    q: 'She sent _____ a link to the best climate change documentary on YouTube.',
    opts: ['to me', 'me', 'for me', 'my'],
    ans: 1,
    expl: `<span class="tag">Tân ngữ trực tiếp và gián tiếp</span>
<strong>Đáp án đúng: "me"</strong><br><br>
Cấu trúc: <strong>V + indirect object + direct object</strong> (không cần giới từ khi IO đứng trước).<br><br>
<em>"She sent <strong>me</strong> a link."</em> (me = IO, a link = DO)<br>
<em>"She sent a link <strong>to me</strong>."</em> (giới từ khi đảo vị trí)<br>
⚠️ Không dùng "sent to me a link"`,
  },

  // ── Wish ─────────────────────────────────────────────────────────────────
  {
    topic: 'Wish',
    q: 'I _____ I had more free time to exercise and take care of my health.',
    opts: ['hope', 'wish', 'want', 'would like'],
    ans: 1,
    expl: `<span class="tag">Wish – Mong muốn hiện tại</span>
<strong>Đáp án đúng: "wish"</strong><br><br>
"Wish + past simple" = mong muốn về điều <strong>không có thật ở hiện tại</strong>.<br><br>
<strong>Các dạng wish:</strong><br>
• wish + past simple → không có thật hiện tại<br>
• wish + past perfect → tiếc nuối về quá khứ<br>
• wish + would → mong ai đó làm gì<br>
⚠️ "Hope" = mong, có thể xảy ra; "wish" = ước, thường không thực tế`,
  },

  // ── Unreal Past ───────────────────────────────────────────────────────────
  {
    topic: 'Unreal Past',
    q: 'I\'d rather you _____ my social media password with anyone. It\'s very private.',
    opts: ["don't share", "didn't share", "won't share", "not share"],
    ans: 1,
    expl: `<span class="tag">Would rather – Unreal Past</span>
<strong>Đáp án đúng: "didn't share"</strong><br><br>
"Would rather + S + <strong>past simple</strong>" = muốn người khác (không) làm gì → dùng past simple để diễn tả ý nghĩa giả định (unreal past).<br><br>
<strong>So sánh:</strong><br>
• "I'd rather <em>go</em>" (chủ ngữ giống nhau → V nguyên thể)<br>
• "I'd rather <em>you went</em>" (chủ ngữ khác nhau → past simple)`,
  },

  // ── Contrast Structures ───────────────────────────────────────────────────
  {
    topic: 'Contrast Structures',
    q: '_____ many people say they care about climate change, very few actually change their daily habits.',
    opts: ['Because', 'Although', 'So', 'Since'],
    ans: 1,
    expl: `<span class="tag">Cấu trúc tương phản</span>
<strong>Đáp án đúng: "Although"</strong><br><br>
"Although / Even though / Though" = <strong>mặc dù</strong> (tương phản giữa hai ý đối lập).<br><br>
<strong>Phân biệt:</strong><br>
• although/even though/though + clause<br>
• in spite of / despite + noun/V-ing<br>
• however / nevertheless (nối hai câu độc lập)`,
  },

  // ── -ing Form and Infinitive ──────────────────────────────────────────────
  {
    topic: '-ing Form and Infinitive',
    q: 'She decided _____ an AI writing tool to help her improve her English essays.',
    opts: ['using', 'use', 'to use', 'used'],
    ans: 2,
    expl: `<span class="tag">-ing form và Infinitive</span>
<strong>Đáp án đúng: "to use"</strong><br><br>
"Decide" theo sau bởi <strong>to-infinitive</strong>.<br><br>
<strong>Động từ + to-V:</strong> decide, want, need, hope, plan, agree, refuse, offer, manage, promise, afford<br>
<strong>Động từ + V-ing:</strong> enjoy, avoid, finish, suggest, keep, consider, mind, practise`,
  },

  // ── Verb Patterns (change in meaning) ────────────────────────────────────
  {
    topic: 'Verb Patterns',
    q: 'She stopped _____ fast food completely when she started her new fitness plan.',
    opts: ['to eat', 'eating', 'eat', 'having eaten'],
    ans: 1,
    expl: `<span class="tag">Verb + -ing/-infinitive (nghĩa thay đổi)</span>
<strong>Đáp án đúng: "eating"</strong><br><br>
<strong>stop + V-ing</strong> = dừng hành động đó lại (cô ấy không còn ăn nữa).<br>
<strong>stop + to-V</strong> = dừng lại ĐỂ làm việc khác.<br><br>
<em>"She stopped eating fast food."</em> = Cô ấy bỏ ăn đồ ăn nhanh.<br>
<em>"She stopped to eat lunch."</em> = Cô ấy dừng lại để ăn trưa.`,
  },

  // ── Verb Patterns ────────────────────────────────────────────────────────
  {
    topic: 'Verb Patterns',
    q: 'The new app lets users _____ their fitness goals directly with friends on social media.',
    opts: ['to share', 'sharing', 'share', 'shared'],
    ans: 2,
    expl: `<span class="tag">Verb Patterns – Let/Make/Have</span>
<strong>Đáp án đúng: "share"</strong><br><br>
"Let + object + <strong>bare infinitive</strong> (V nguyên thể không to)"<br><br>
<strong>Cấu trúc tương tự:</strong><br>
• let + O + V (bare inf.)<br>
• make + O + V (bare inf.)<br>
• help + O + (to-)V<br>
⚠️ "Allow" khác: allow + O + to-V`,
  },

  // ── Both / Either / Neither / So / Nor ───────────────────────────────────
  {
    topic: 'Both / Either / Neither / So / Nor',
    q: '_____ yoga and Pilates have become very popular fitness choices among Gen Z in 2026.',
    opts: ['Either', 'Neither', 'Both', 'Not only'],
    ans: 2,
    expl: `<span class="tag">Both / Either / Neither</span>
<strong>Đáp án đúng: "Both"</strong><br><br>
"Both A and B" = <strong>cả A và B đều</strong>... → động từ số nhiều (have).<br><br>
<strong>Phân biệt:</strong><br>
• <em>both A and B</em> = cả hai (khẳng định)<br>
• <em>either A or B</em> = hoặc A hoặc B (một trong hai)<br>
• <em>neither A nor B</em> = không A cũng không B (phủ định cả hai)`,
  },
  {
    topic: 'Both / Either / Neither / So / Nor',
    q: 'I don\'t check social media first thing in the morning, and _____ does my flatmate.',
    opts: ['so', 'neither', 'either', 'nor'],
    ans: 1,
    expl: `<span class="tag">Neither / So – Đồng ý</span>
<strong>Đáp án đúng: "neither"</strong><br><br>
Đồng ý với câu <strong>phủ định</strong> → "Neither + auxiliary + S".<br>
Đồng ý với câu <strong>khẳng định</strong> → "So + auxiliary + S".<br><br>
<em>"I don't eat meat, and neither does she."</em><br>
<em>"I love sushi, and so does he."</em>`,
  },

  // ── Connectives ───────────────────────────────────────────────────────────
  {
    topic: 'Connectives',
    q: 'The city introduced more bike lanes; _____, the number of cars in the city centre dropped by 30%.',
    opts: ['however', 'as a result', 'although', 'in spite of'],
    ans: 1,
    expl: `<span class="tag">Connectives – Kết quả</span>
<strong>Đáp án đúng: "as a result"</strong><br><br>
"As a result" = <strong>kết quả là</strong>, nối nguyên nhân và kết quả.<br><br>
<strong>Connectives theo nhóm:</strong><br>
• Kết quả: as a result, therefore, consequently, so<br>
• Tương phản: however, nevertheless, on the other hand<br>
• Bổ sung: furthermore, in addition, moreover`,
  },

  // ── Causative ─────────────────────────────────────────────────────────────
  {
    topic: 'Causative',
    q: 'She _____ her profile photo taken by a professional photographer for her new LinkedIn page.',
    opts: ['made', 'let', 'had', 'did'],
    ans: 2,
    expl: `<span class="tag">Cấu trúc nhân quả (Causative)</span>
<strong>Đáp án đúng: "had"</strong><br><br>
"Have + object + V3" = nhờ/thuê ai đó làm gì (không tự làm).<br><br>
<strong>Cấu trúc:</strong> S + have/get + O + V3<br>
<em>"I had my car repaired."</em> = Tôi nhờ người sửa xe.<br>
<em>"She got her hair cut."</em> = Cô ấy đi cắt tóc.<br>
⚠️ "Made" = bắt buộc ai làm gì (make + O + bare V)`,
  },

  // ── Prefer / Would rather / Had better ───────────────────────────────────
  {
    topic: 'Prefer / Would rather / Had better',
    q: 'You _____ see a doctor before starting any intense exercise programme. It could be dangerous.',
    opts: ['would rather', 'prefer', 'had better', 'would prefer'],
    ans: 2,
    expl: `<span class="tag">Had better – Lời khuyên có cảnh báo</span>
<strong>Đáp án đúng: "had better"</strong><br><br>
"Had better + V" = lời khuyên có <strong>hàm ý cảnh báo</strong> (nếu không làm thì có thể có hậu quả).<br><br>
<strong>So sánh:</strong><br>
• <em>should</em> = lời khuyên thông thường<br>
• <em>had better</em> = lời khuyên có cảnh báo (mạnh hơn should)<br>
• <em>would rather</em> = muốn làm gì hơn (sở thích)`,
  },

  // ── Infinitives of Purpose ────────────────────────────────────────────────
  {
    topic: 'Infinitives of Purpose',
    q: 'Many students now use AI chatbots _____ understand difficult grammar rules more quickly.',
    opts: ['so that', 'for', 'to', 'in order'],
    ans: 2,
    expl: `<span class="tag">Infinitive of Purpose</span>
<strong>Đáp án đúng: "to"</strong><br><br>
"To + V" diễn tả <strong>mục đích</strong> của hành động (= in order to).<br><br>
<strong>Các cách diễn tả mục đích:</strong><br>
• to / in order to + V (cùng chủ ngữ)<br>
• so as to + V (trang trọng hơn)<br>
• so that + S + can/could + V (chủ ngữ khác nhau)<br>
⚠️ "for" + noun / V-ing dùng cho mục đích chung: "for fun", "for cleaning"`,
  },

  // ── Participles ───────────────────────────────────────────────────────────
  {
    topic: 'Participles',
    q: '_____ in a city near the coast, she sees the effects of rising sea levels every single day.',
    opts: ['Lived', 'Living', 'To live', 'She lives'],
    ans: 1,
    expl: `<span class="tag">Mệnh đề phân từ (Participial Phrase)</span>
<strong>Đáp án đúng: "Living"</strong><br><br>
Mệnh đề phân từ rút gọn: khi hai mệnh đề có <strong>cùng chủ ngữ</strong>, dùng V-ing thay cho mệnh đề đầy đủ.<br><br>
"Living in a city..." = "Because she lives in a city..." (rút gọn mệnh đề nguyên nhân)<br>
<strong>Lưu ý:</strong> Chủ ngữ của cả hai vế phải giống nhau để tránh lỗi dangling participle.`,
  },

  // ── Inversions ────────────────────────────────────────────────────────────
  {
    topic: 'Inversions',
    q: '_____ had the climate activist posted the video than it went viral across all platforms.',
    opts: ['No sooner', 'Barely', 'Hardly ever', 'Scarcely ever'],
    ans: 0,
    expl: `<span class="tag">Đảo ngữ (Inversion)</span>
<strong>Đáp án đúng: "No sooner"</strong><br><br>
"No sooner + had + S + V3... <strong>than</strong>..." = vừa mới... thì...<br><br>
<strong>Các cấu trúc đảo ngữ tương tự:</strong><br>
• <em>Hardly / Scarcely + had + S + V3... when...</em><br>
• <em>Never have I seen...</em><br>
• <em>Not only did she..., but she also...</em><br>
Đảo ngữ thường dùng trong văn viết trang trọng.`,
  },

  // ── Possessives ───────────────────────────────────────────────────────────
  {
    topic: 'Possessives',
    q: 'That smartwatch isn\'t mine. It must be _____ — he left it here after the gym session.',
    opts: ["Tom's", 'Toms', 'of Tom', 'Tom'],
    ans: 0,
    expl: `<span class="tag">Sở hữu cách (Possessive 's)</span>
<strong>Đáp án đúng: "Tom's"</strong><br><br>
Sở hữu cách: <strong>danh từ + 's</strong> để chỉ vật thuộc về ai.<br><br>
<strong>Quy tắc:</strong><br>
• Số ít: Tom's, the girl's<br>
• Số nhiều có s: the students' books (chỉ thêm ')<br>
• Số nhiều không có s: the children's, the men's`,
  },

  // ── Quantifiers ───────────────────────────────────────────────────────────
  {
    topic: 'Quantifiers',
    q: 'There is _____ information online about healthy eating, but not all of it is reliable.',
    opts: ['many', 'a few', 'a lot of', 'few'],
    ans: 2,
    expl: `<span class="tag">Lượng từ (Quantifiers)</span>
<strong>Đáp án đúng: "a lot of"</strong><br><br>
"Information" là danh từ <strong>không đếm được</strong> → dùng "a lot of", "much", hoặc "some".<br><br>
<strong>Quy tắc:</strong><br>
• many / a few / few + <em>countable plural nouns</em><br>
• much / a little / little + <em>uncountable nouns</em><br>
• a lot of / lots of / some / any + <em>cả hai loại</em>`,
  },

  // ── Prepositional Phrases ─────────────────────────────────────────────────
  {
    topic: 'Prepositional Phrases',
    q: '_____ a result of social media pressure, many teenagers report feeling anxious about their appearance.',
    opts: ['For', 'As', 'Because', 'By'],
    ans: 1,
    expl: `<span class="tag">Cụm giới từ (Prepositional Phrases)</span>
<strong>Đáp án đúng: "As"</strong><br><br>
"As a result of + noun" = do kết quả của..., là hệ quả của...<br><br>
<strong>Phân biệt:</strong><br>
• <em>as a result of + noun</em><br>
• <em>because of + noun</em> (cũng đúng về nghĩa, nhưng câu hỏi hỏi về "a result")<br>
• <em>due to + noun</em><br>
⚠️ "Because + clause" (có chủ ngữ và động từ)`,
  },

  // ── Word Formation ────────────────────────────────────────────────────────
  {
    topic: 'Word Formation',
    q: 'The rise of AI has brought about a complete _____ of how we search for information online.',
    opts: ['transform', 'transforming', 'transformed', 'transformation'],
    ans: 3,
    expl: `<span class="tag">Cấu tạo từ (Word Formation)</span>
<strong>Đáp án đúng: "transformation"</strong><br><br>
Sau mạo từ "a" + tính từ "complete" cần <strong>danh từ</strong> → "transformation" (noun).<br><br>
<strong>Các dạng của "transform":</strong><br>
• transform (v) → transformation (n) → transformative (adj)<br>
<strong>Hậu tố danh từ phổ biến:</strong> -tion, -sion, -ment, -ness, -ity, -ance`,
  },

  // ── Phrasal Verbs ─────────────────────────────────────────────────────────
  {
    topic: 'Phrasal Verbs',
    q: 'She decided to _____ her old social media accounts and start fresh with a new online identity.',
    opts: ['delete off', 'take off', 'close down', 'shut away'],
    ans: 2,
    expl: `<span class="tag">Phrasal Verbs</span>
<strong>Đáp án đúng: "close down"</strong><br><br>
"Close down" = đóng (tài khoản, doanh nghiệp), ngừng hoạt động.<br><br>
<strong>Phân biệt:</strong><br>
• <em>close down</em> = đóng cửa hẳn<br>
• <em>take off</em> = cất cánh / thành công đột ngột<br>
• <em>shut away</em> = nhốt vào, cô lập<br>
• <em>delete off</em> = không phải cụm từ cố định`,
  },

  // ── Collocations ─────────────────────────────────────────────────────────
  {
    topic: 'Collocations',
    q: 'Fitness experts say it is important to _____ a balance between exercise, rest, and nutrition.',
    opts: ['do', 'keep', 'make', 'have'],
    ans: 1,
    expl: `<span class="tag">Collocations</span>
<strong>Đáp án đúng: "keep"</strong><br><br>
"Keep a balance" là collocation phổ biến và tự nhiên trong tiếng Anh.<br><br>
<strong>Collocation với "keep":</strong> keep a secret, keep a promise, keep in touch, keep fit, keep a diary<br>
<strong>Collocation với "make":</strong> make a decision, make a mistake, make progress<br>
<strong>Collocation với "do":</strong> do exercise, do research, do homework`,
  },
]

async function seedQuestions() {
  const batchSize = 20
  for (let i = 0; i < QUESTIONS.length; i += batchSize) {
    const batch = QUESTIONS.slice(i, i + batchSize)
    const { error } = await supabase.from('questions').insert(batch)
    if (error) {
      console.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message)
      process.exit(1)
    }
    console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} — ${batch.length} questions`)
  }
  console.log(`\nDone. Seeded ${QUESTIONS.length} questions across ${new Set(QUESTIONS.map(q => q.topic)).size} grammar topics.`)
}

seedQuestions()
