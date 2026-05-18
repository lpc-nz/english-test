import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Q = { topic: string; q: string; opts: [string,string,string,string]; ans: 0|1|2|3; expl: string; test_number: number }

const QUESTIONS: Q[] = [
  // Present Simple (2)
  { test_number:4, topic:'Present Simple', q:'Most people _____ their phones more than five hours a day.', opts:['use','uses','is using','used'], ans:0,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: use</strong> — Thói quen/thực tế chung → hiện tại đơn. Most people (số nhiều) → use.` },
  { test_number:4, topic:'Present Simple', q:'The app _____ your location to give accurate directions.', opts:['track','tracks','is tracking','tracked'], ans:1,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: tracks</strong> — Cách phần mềm hoạt động (sự thật) → hiện tại đơn. The app (số ít) → tracks.` },

  // Present Continuous (1)
  { test_number:4, topic:'Present Continuous', q:'Scientists _____ a new vaccine for the virus at the moment.', opts:['develop','developed','are developing','have developed'], ans:2,
    expl:`<span class="tag">Hiện tại tiếp diễn</span><strong>Đáp án: are developing</strong> — "At the moment" → hành động đang xảy ra → are/is + V-ing.` },

  // Stative Verbs (1)
  { test_number:4, topic:'Stative Verbs', q:'I _____ that social media _____ more harm than good.', opts:['am thinking / does','think / does','am thinking / is doing','think / is doing'], ans:1,
    expl:`<span class="tag">Động từ trạng thái</span><strong>Đáp án: think / does</strong> — "Think" (ý kiến) là động từ trạng thái → không dùng tiếp diễn.` },

  // Past Simple (2)
  { test_number:4, topic:'Past Simple', q:'The company _____ its first smartphone in 2007.', opts:['launch','has launched','launched','is launching'], ans:2,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: launched</strong> — "In 2007" = thời điểm quá khứ xác định → quá khứ đơn.` },
  { test_number:4, topic:'Past Simple', q:'She _____ all her old emails before changing jobs.', opts:['delete','has deleted','deleted','is deleting'], ans:2,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: deleted</strong> — Hành động hoàn thành ở thời điểm xác định trong quá khứ (before changing jobs).` },

  // Past Continuous (1)
  { test_number:4, topic:'Past Continuous', q:'The server _____ when the engineer tried to fix it.', opts:['crashed','was crashing','has crashed','crashes'], ans:1,
    expl:`<span class="tag">Quá khứ tiếp diễn</span><strong>Đáp án: was crashing</strong> — Hành động đang xảy ra khi sự kiện khác xảy ra → was/were + V-ing.` },

  // Used to (1)
  { test_number:4, topic:'Used to', q:'People _____ send letters by post, but now they send emails.', opts:['used to','are used to','use to','were used to'], ans:0,
    expl:`<span class="tag">Used to</span><strong>Đáp án: used to</strong> — Thói quen/tình huống trong quá khứ, nay đã thay đổi → used to + V.` },

  // Present Perfect (1)
  { test_number:4, topic:'Present Perfect', q:'Artificial intelligence _____ changed many industries in recent years.', opts:['is','has','have','had'], ans:1,
    expl:`<span class="tag">Hiện tại hoàn thành</span><strong>Đáp án: has</strong> — Kết quả hiện tại quan trọng, không xác định thời điểm cụ thể → has + V3.` },

  // Present Perfect Continuous (1)
  { test_number:4, topic:'Present Perfect Continuous', q:'Engineers _____ on this problem for months without a solution.', opts:['worked','have worked','have been working','are working'], ans:2,
    expl:`<span class="tag">Hiện tại hoàn thành tiếp diễn</span><strong>Đáp án: have been working</strong> — Nhấn mạnh tính liên tục → have been + V-ing + for.` },

  // Past Perfect (1)
  { test_number:4, topic:'Past Perfect', q:'By the time the update was released, the company _____ the bug for weeks.', opts:['fixes','fixed','had fixed','has fixed'], ans:2,
    expl:`<span class="tag">Quá khứ hoàn thành</span><strong>Đáp án: had fixed</strong> — Hành động xảy ra TRƯỚC thời điểm quá khứ khác → had + V3.` },

  // Past Perfect Continuous (1)
  { test_number:4, topic:'Past Perfect Continuous', q:'The battery died because she _____ her phone all day without charging it.', opts:['uses','used','had been using','has used'], ans:2,
    expl:`<span class="tag">Quá khứ hoàn thành tiếp diễn</span><strong>Đáp án: had been using</strong> — Hoạt động liên tục TRƯỚC thời điểm quá khứ → had been + V-ing.` },

  // Future Forms (2)
  { test_number:4, topic:'Future Forms', q:"The software update _____ automatically tonight at midnight.", opts:['installs','will install','is going to install','has installed'], ans:0,
    expl:`<span class="tag">Hiện tại đơn – lịch trình</span><strong>Đáp án: installs</strong> — Sự kiện đã được lập trình/lên lịch cố định → hiện tại đơn.` },
  { test_number:4, topic:'Future Forms', q:"Look at these statistics — renewable energy _____ replace fossil fuels within a decade.", opts:['is going to','will','would','is'], ans:0,
    expl:`<span class="tag">Be going to</span><strong>Đáp án: is going to</strong> — Bằng chứng hiện tại (thống kê) → dự đoán có cơ sở → be going to.` },

  // Prepositions (1)
  { test_number:4, topic:'Prepositions', q:'The data is stored _____ the cloud _____ servers located _____ different countries.', opts:['in / on / in','on / in / in','in / in / at','at / on / in'], ans:0,
    expl:`<span class="tag">Giới từ</span><strong>Đáp án: in / on / in</strong> — "In the cloud". "On servers". "In different countries".` },

  // Passive Voice (2)
  { test_number:4, topic:'Passive Voice', q:'Personal data _____ by many companies without users knowing.', opts:['collects','is collected','is collecting','collected'], ans:1,
    expl:`<span class="tag">Bị động – hiện tại đơn</span><strong>Đáp án: is collected</strong> — Bị động hiện tại đơn: is/am/are + V3.` },
  { test_number:4, topic:'Passive Voice', q:'The new policy _____ by the government last month.', opts:['is announced','was announced','announced','has announced'], ans:1,
    expl:`<span class="tag">Bị động – quá khứ đơn</span><strong>Đáp án: was announced</strong> — "Last month" = quá khứ xác định. Bị động: was/were + V3.` },

  // Countable & Uncountable (1)
  { test_number:4, topic:'Countable and Uncountable Nouns', q:'We need more _____ to train the AI model properly.', opts:['datas','data','a data','many data'], ans:1,
    expl:`<span class="tag">Danh từ không đếm được</span><strong>Đáp án: data</strong> — "Data" không đếm được trong tiếng Anh hiện đại → không thêm -s, không dùng a/an.` },

  // Articles (1)
  { test_number:4, topic:'Articles', q:'She bought _____ new laptop. _____ laptop has a very fast processor.', opts:['a / The','the / The','a / A','an / The'], ans:0,
    expl:`<span class="tag">Mạo từ</span><strong>Đáp án: a / The</strong> — Lần đầu đề cập → "a new laptop". Lần hai đề cập (đã biết) → "The laptop".` },

  // Pronouns (1)
  { test_number:4, topic:'Pronouns', q:'The IT department sent the update to my colleague and _____ last night.', opts:['I','me','my','mine'], ans:1,
    expl:`<span class="tag">Đại từ</span><strong>Đáp án: me</strong> — Làm tân ngữ (sent to me) → đại từ tân ngữ "me".` },

  // Possessive Determiners (1)
  { test_number:4, topic:'Possessive Determiners', q:'Each user must create _____ own password and not share it.', opts:['their','theirs','them','they'], ans:0,
    expl:`<span class="tag">Tính từ sở hữu</span><strong>Đáp án: their</strong> — Trước danh từ (own password) → tính từ sở hữu. "Each user" → singular but "their" is accepted.` },

  // Relative Clauses (1)
  { test_number:4, topic:'Relative Clauses', q:'The scientist _____ discovered this formula won the Nobel Prize.', opts:['who','which','whose','whom'], ans:0,
    expl:`<span class="tag">Mệnh đề quan hệ</span><strong>Đáp án: who</strong> — Người làm chủ ngữ trong mệnh đề quan hệ → "who".` },

  // Reduced Relative Clauses (1)
  { test_number:4, topic:'Reduced Relative Clauses', q:'The email _____ yesterday contained important information.', opts:['received','receiving','which receiving','has received'], ans:0,
    expl:`<span class="tag">Mệnh đề quan hệ rút gọn</span><strong>Đáp án: received</strong> — "Which was received" rút gọn bị động → V3 (past participle).` },

  // Modals (2)
  { test_number:4, topic:'Modal Verbs', q:'The lights are on and there is noise inside. Someone _____ be home.', opts:['should','must','can','will'], ans:1,
    expl:`<span class="tag">Suy luận chắc chắn</span><strong>Đáp án: must</strong> — Suy luận logic dựa trên bằng chứng → "must" (gần như chắc chắn).` },
  { test_number:4, topic:'Modal Verbs', q:'You _____ have to update the app manually — it updates itself.', opts:["don't","mustn't","couldn't","shouldn't"], ans:0,
    expl:`<span class="tag">Không cần thiết</span><strong>Đáp án: don't have to</strong> — Không bắt buộc/không cần thiết → "don't have to". "Mustn't" = cấm đoán.` },

  // Modal Perfect (1)
  { test_number:4, topic:'Modal Perfect', q:"The system _____ down — someone must have deleted an important file.", opts:['might crash','might have crashed','should crash','can crash'], ans:1,
    expl:`<span class="tag">Modal perfect</span><strong>Đáp án: might have crashed</strong> — Suy luận không chắc chắn về quá khứ: might have + V3.` },

  // Questions (1)
  { test_number:4, topic:'Questions', q:'_____ time does it take to download a 10 GB file on this connection?', opts:['How much','How long','How many','How often'], ans:1,
    expl:`<span class="tag">Câu hỏi</span><strong>Đáp án: How long</strong> — Hỏi về thời gian → "How long".` },

  // Question Tags (1)
  { test_number:4, topic:'Question Tags', q:"This technology will change everything, _____ ?", opts:["won't it","will it","wouldn't it","doesn't it"], ans:0,
    expl:`<span class="tag">Câu hỏi đuôi</span><strong>Đáp án: won't it</strong> — Mệnh đề khẳng định (will) → đuôi phủ định: won't it.` },

  // Indirect Questions (1)
  { test_number:4, topic:'Indirect Questions', q:'I wonder _____ this software is safe to install.', opts:['whether','that','which','what'], ans:0,
    expl:`<span class="tag">Câu hỏi gián tiếp</span><strong>Đáp án: whether</strong> — Yes/No question gián tiếp → "whether/if + S + V".` },

  // So and Such (1)
  { test_number:4, topic:'So and Such', q:'It was _____ complex code that even the developers struggled to understand it.', opts:['so','such','too','very'], ans:1,
    expl:`<span class="tag">Such</span><strong>Đáp án: such</strong> — "Such + a/an + adj + noun + that". "So + adj + that" (không có danh từ theo sau trực tiếp).` },

  // Too and Enough (1)
  { test_number:4, topic:'Too and Enough', q:'The internet connection is not fast _____ to stream 4K video.', opts:['too','enough','so','very'], ans:1,
    expl:`<span class="tag">Enough</span><strong>Đáp án: enough</strong> — "Adj + enough + to-V" = đủ ... để làm gì.` },

  // Comparatives (1)
  { test_number:4, topic:'Comparatives', q:'The new model is _____ than the previous version in every way.', opts:['more good','better','best','the best'], ans:1,
    expl:`<span class="tag">So sánh hơn</span><strong>Đáp án: better</strong> — Bất quy tắc: good → better (+ than).` },

  // Superlatives (1)
  { test_number:4, topic:'Superlatives', q:'This is _____ phone on the market right now.', opts:['the most powerful','the more powerful','a most powerful','most powerful'], ans:0,
    expl:`<span class="tag">So sánh nhất</span><strong>Đáp án: the most powerful</strong> — Tính từ dài (powerful) → the most + adj.` },

  // Zero Conditional (1)
  { test_number:4, topic:'Conditionals', q:'If you _____ the button, the machine stops immediately.', opts:['press','pressed','will press','would press'], ans:0,
    expl:`<span class="tag">Điều kiện loại 0</span><strong>Đáp án: press</strong> — Sự thật/kết quả tất yếu → hiện tại đơn ở cả hai mệnh đề.` },

  // First Conditional (1)
  { test_number:4, topic:'Conditionals', q:'If the government _____ more in renewable energy, pollution will decrease.', opts:['invests','invested','will invest','would invest'], ans:0,
    expl:`<span class="tag">Điều kiện loại 1</span><strong>Đáp án: invests</strong> — Có thể xảy ra: If + hiện tại đơn, will + V.` },

  // Second Conditional (1)
  { test_number:4, topic:'Conditionals', q:'If every country _____ carbon emissions, climate change would slow down.', opts:['reduces','reduced','will reduce','would reduce'], ans:1,
    expl:`<span class="tag">Điều kiện loại 2</span><strong>Đáp án: reduced</strong> — Giả định không thật ở hiện tại: If + V quá khứ, would + V.` },

  // Third Conditional (1)
  { test_number:4, topic:'Conditionals', q:'If scientists _____ this technology earlier, we would have solved the energy crisis.', opts:['discover','discovered','had discovered','would discover'], ans:2,
    expl:`<span class="tag">Điều kiện loại 3</span><strong>Đáp án: had discovered</strong> — Không thật ở quá khứ: If + had + V3, would have + V3.` },

  // Mixed Conditional (1)
  { test_number:4, topic:'Conditionals', q:'If they _____ the data correctly, the results would be reliable now.', opts:['analysed','had analysed','would analyse','analyse'], ans:1,
    expl:`<span class="tag">Điều kiện hỗn hợp</span><strong>Đáp án: had analysed</strong> — Nguyên nhân quá khứ → kết quả hiện tại: If + had + V3 / would + V now.` },

  // Inverted Conditionals (1)
  { test_number:4, topic:'Inverted Conditionals', q:'_____ the funding been approved, the project would have started last year.', opts:['Had','Should','Were','Did'], ans:0,
    expl:`<span class="tag">Đảo ngữ điều kiện</span><strong>Đáp án: Had</strong> — Đảo ngữ loại 3: Had + S + V3 (= If the funding had been approved...).` },

  // Unless / In case / As long as (1)
  { test_number:4, topic:'Unless / In case / As long as', q:'_____ you back up your files, you risk losing all your work.', opts:['Unless','In case','As long as','Although'], ans:0,
    expl:`<span class="tag">Unless</span><strong>Đáp án: Unless</strong> — "Unless you back up" = If you do not back up (trừ khi bạn sao lưu).` },

  // Reported Speech (1)
  { test_number:4, topic:'Reported Speech', q:'"The system is down," the engineer said. → The engineer said that the system _____ down.', opts:['is','was','has been','would be'], ans:1,
    expl:`<span class="tag">Câu tường thuật</span><strong>Đáp án: was</strong> — Lùi thì: is → was.` },

  // Reported Questions (1)
  { test_number:4, topic:'Reported Questions', q:'"When will the update be ready?" → She asked when the update _____ ready.', opts:['will be','would be','is','was'], ans:1,
    expl:`<span class="tag">Câu hỏi tường thuật</span><strong>Đáp án: would be</strong> — Lùi thì: will → would. Trật tự: S + V.` },

  // Reporting Verbs (1)
  { test_number:4, topic:'Reporting Verbs', q:'The company _____ using its app to track users without permission.', opts:['denied','refused','warned','suggested'], ans:0,
    expl:`<span class="tag">Động từ tường thuật</span><strong>Đáp án: denied</strong> — "Deny + V-ing" = phủ nhận đã làm gì.` },

  // Direct & Indirect Objects (1)
  { test_number:4, topic:'Direct and Indirect Objects', q:'The engineer explained the problem _____ in simple terms.', opts:['us','to us','for us','we'], ans:1,
    expl:`<span class="tag">Tân ngữ</span><strong>Đáp án: to us</strong> — "Explain" thường dùng: explain + DO + to + IO (explain sth to sb). Không dùng "explain us".` },

  // Wish (1)
  { test_number:4, topic:'Wish', q:'I wish the internet _____ faster in rural areas.', opts:['is','was','were','will be'], ans:2,
    expl:`<span class="tag">Wish</span><strong>Đáp án: were</strong> — Mong muốn trái thực tế ở hiện tại: wish + were (chuẩn với mọi ngôi).` },

  // Unreal Past (1)
  { test_number:4, topic:'Unreal Past', q:"It's about time the company _____ its privacy policy.", opts:['updates','updated','to update','will update'], ans:1,
    expl:`<span class="tag">Quá khứ giả định</span><strong>Đáp án: updated</strong> — "It's about time / It's time + S + V quá khứ" = đã đến lúc (cần làm ngay).` },

  // Contrast Structures (1)
  { test_number:4, topic:'Contrast Structures', q:'_____ the risks, many people still share personal data online freely.', opts:['Despite','Although','However','Even though'], ans:0,
    expl:`<span class="tag">Cấu trúc đối lập</span><strong>Đáp án: Despite</strong> — "Despite" + danh từ/V-ing. "Although/Even though" + mệnh đề.` },

  // -ing / Infinitive (1)
  { test_number:4, topic:'-ing Form and Infinitive', q:'The company promised _____ all users of the security breach.', opts:['notifying','to notify','notify','having notified'], ans:1,
    expl:`<span class="tag">Infinitive</span><strong>Đáp án: to notify</strong> — "Promise" → to-infinitive: promise to + V.` },

  // Verb patterns – meaning change (1)
  { test_number:4, topic:'Verb Patterns (meaning change)', q:'I tried _____ the computer off and on, and it finally worked.', opts:['to turn','turning','turn','turned'], ans:1,
    expl:`<span class="tag">Nghĩa thay đổi</span><strong>Đáp án: turning</strong> — "Try + V-ing" = thử làm xem sao. "Try to-V" = cố gắng làm (nhưng có thể thất bại).` },

  // Verb Patterns (1)
  { test_number:4, topic:'Verb Patterns', q:'The new algorithm allows users _____ content in multiple languages.', opts:['search','searching','to search','searched'], ans:2,
    expl:`<span class="tag">Verb patterns</span><strong>Đáp án: to search</strong> — "Allow + O + to-V" = cho phép ai làm gì.` },

  // Both / Either / Neither (1)
  { test_number:4, topic:'Both / Either / Neither / So / Nor', q:'"I don\'t use social media." "_____ do I. It wastes too much time."', opts:['Neither','Either','Both','Nor'], ans:0,
    expl:`<span class="tag">Neither / Nor</span><strong>Đáp án: Neither</strong> — Đồng ý với câu phủ định: "Neither + trợ động từ + S" = tôi cũng không.` },

  // Connectives (1)
  { test_number:4, topic:'Connectives', q:'Electric cars are better for the environment. _____, they are more expensive to buy.', opts:['However','Therefore','Moreover','Nevertheless'], ans:0,
    expl:`<span class="tag">Connectives</span><strong>Đáp án: However</strong> — Đối lập với ý trước → "However" (tuy nhiên, nhưng).` },

  // Causative (1)
  { test_number:4, topic:'Causative', q:'The company _____ its systems tested by an independent security firm.', opts:['made','did','had','let'], ans:2,
    expl:`<span class="tag">Causative</span><strong>Đáp án: had</strong> — "Have + O + V3" = nhờ/thuê ai làm gì cho mình.` },

  // Prefer / Would Rather / Had Better (1)
  { test_number:4, topic:'Prefer / Would Rather / Had Better', q:'I _____ use a tablet than a laptop when travelling.', opts:['had better','would rather','prefer','used to'], ans:1,
    expl:`<span class="tag">Would rather</span><strong>Đáp án: would rather</strong> — "Would rather + V" = thích làm điều này hơn. "Would rather A than B".` },

  // Infinitives of Purpose (1)
  { test_number:4, topic:'Infinitives of Purpose', q:'She downloaded the app _____ her carbon footprint each week.', opts:['to track','for tracking','for track','tracking'], ans:0,
    expl:`<span class="tag">Infinitive mục đích</span><strong>Đáp án: to track</strong> — "To + V" diễn tả mục đích.` },

  // Participles (1)
  { test_number:4, topic:'Participles', q:'_____ in over 190 countries, the app has millions of daily users.', opts:['Use','Using','Used','To use'], ans:2,
    expl:`<span class="tag">Phân từ bị động</span><strong>Đáp án: Used</strong> — Phân từ quá khứ làm trạng ngữ bị động: "Used in 190 countries" = "Being used in...".` },

  // Inversions (1)
  { test_number:4, topic:'Inversions', q:'Not until recently _____ that smartphones would become so essential.', opts:['anyone realised','did anyone realise','anyone did realise','realised anyone'], ans:1,
    expl:`<span class="tag">Đảo ngữ</span><strong>Đáp án: did anyone realise</strong> — "Not until" đứng đầu câu → đảo ngữ: did + S + V.` },

  // Possessives (1)
  { test_number:4, topic:'Possessives', q:"This password isn't mine. It must be _____.", opts:["yours","your's","you","your"], ans:0,
    expl:`<span class="tag">Đại từ sở hữu</span><strong>Đáp án: yours</strong> — Đại từ sở hữu đứng một mình (không có danh từ theo sau) → "yours" (không có dấu nháy).` },

  // Quantifiers (1)
  { test_number:4, topic:'Quantifiers', q:'_____ the information online is unreliable, so always check your sources.', opts:['Much of','Many of','A lot','Several of'], ans:0,
    expl:`<span class="tag">Lượng từ</span><strong>Đáp án: Much of</strong> — "Information" không đếm được → "much of" (không dùng "many of").` },

  // Prepositional Phrases (1)
  { test_number:4, topic:'Prepositional Phrases', q:'This app is available _____ free _____ both Android and iOS devices.', opts:['for / on','of / in','at / for','in / on'], ans:0,
    expl:`<span class="tag">Cụm giới từ</span><strong>Đáp án: for / on</strong> — Cố định: "available for free" = miễn phí. "Available on Android/iOS" = có trên nền tảng.` },

  // Word Formation (1)
  { test_number:4, topic:'Word Formation', q:'The company is looking for someone with good _____ (communicate) skills.', opts:['communicate','communication','communicating','communicational'], ans:1,
    expl:`<span class="tag">Cấu tạo từ</span><strong>Đáp án: communication</strong> — Trước danh từ (skills) → cần danh từ: communicate → communication.` },

  // Phrasal Verbs (1)
  { test_number:4, topic:'Phrasal Verbs', q:'Many people are trying to _____ on their screen time.', opts:['cut down','cut out','cut off','cut up'], ans:0,
    expl:`<span class="tag">Cụm động từ</span><strong>Đáp án: cut down</strong> — "Cut down on" = giảm bớt, hạn chế.` },

  // Collocations (1)
  { test_number:4, topic:'Collocations', q:'Scientists are working to _____ a solution to the plastic pollution problem.', opts:['do','make','find','take'], ans:2,
    expl:`<span class="tag">Collocations</span><strong>Đáp án: find</strong> — Cố định: "find a solution" = tìm ra giải pháp.` },
]

async function main() {
  const batchSize = 20
  for (let i = 0; i < QUESTIONS.length; i += batchSize) {
    const batch = QUESTIONS.slice(i, i + batchSize)
    const { error } = await supabase.from('questions').insert(batch)
    if (error) { console.error(`Batch ${Math.floor(i/batchSize)+1} error:`, error.message); process.exit(1) }
    console.log(`Batch ${Math.floor(i/batchSize)+1} inserted (${batch.length} questions)`)
  }
  console.log(`Done! ${QUESTIONS.length} questions inserted for Test 4.`)
}

main()
