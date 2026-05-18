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
  { test_number:2, topic:'Present Simple', q:'The train _____ at platform 3 every morning at 7:45.', opts:['arrive','arrives','is arriving','arrived'], ans:1,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: arrives</strong> — Lịch trình cố định → hiện tại đơn. The train (số ít) → arrives.` },
  { test_number:2, topic:'Present Simple', q:'My father _____ for a large company in the city centre.', opts:['work','works','is working','worked'], ans:1,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: works</strong> — Công việc ổn định → hiện tại đơn. My father (ngôi 3 số ít) → works.` },

  // Present Continuous (1)
  { test_number:2, topic:'Present Continuous', q:'We _____ to Rome next weekend. Everything is booked.', opts:['fly','flew','are flying','have flown'], ans:2,
    expl:`<span class="tag">Hiện tại tiếp diễn – kế hoạch</span><strong>Đáp án: are flying</strong> — Kế hoạch đã sắp xếp sẵn trong tương lai → are/is + V-ing.` },

  // Stative Verbs (1)
  { test_number:2, topic:'Stative Verbs', q:'This bag _____ too much. I cannot carry it.', opts:['is weighing','weighs','weighed','has weighed'], ans:1,
    expl:`<span class="tag">Động từ trạng thái</span><strong>Đáp án: weighs</strong> — "Weigh" (cân nặng) là động từ trạng thái, không dùng dạng tiếp diễn.` },

  // Past Simple (2)
  { test_number:2, topic:'Past Simple', q:'The company _____ a new office in Singapore last year.', opts:['opens','has opened','opened','is opening'], ans:2,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: opened</strong> — "Last year" = thời điểm quá khứ xác định → quá khứ đơn.` },
  { test_number:2, topic:'Past Simple', q:'I _____ my passport when I travelled to Japan in 2019.', opts:['lose','lost','have lost','was losing'], ans:1,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: lost</strong> — Sự kiện hoàn thành ở thời điểm quá khứ cụ thể → V2 (lost).` },

  // Past Continuous (1)
  { test_number:2, topic:'Past Continuous', q:'The manager _____ a meeting when I called her office.', opts:['has','was having','had','is having'], ans:1,
    expl:`<span class="tag">Quá khứ tiếp diễn</span><strong>Đáp án: was having</strong> — Hành động đang xảy ra (was having) khi bị gián đoạn (called).` },

  // Used to (1)
  { test_number:2, topic:'Used to', q:'Taxis _____ be the only way to get around the city, but now we have apps.', opts:['used to','are used to','use to','were used to'], ans:0,
    expl:`<span class="tag">Used to</span><strong>Đáp án: used to</strong> — Tình huống trong quá khứ, nay đã thay đổi → used to + V.` },

  // Present Perfect (1)
  { test_number:2, topic:'Present Perfect', q:'The team _____ just finished the quarterly report.', opts:['has','have','had','is'], ans:0,
    expl:`<span class="tag">Hiện tại hoàn thành</span><strong>Đáp án: has</strong> — "Just" + present perfect: has + V3. The team (số ít) → has.` },

  // Present Perfect Continuous (1)
  { test_number:2, topic:'Present Perfect Continuous', q:'He _____ for that airline for fifteen years.', opts:['worked','has worked','has been working','is working'], ans:2,
    expl:`<span class="tag">Hiện tại hoàn thành tiếp diễn</span><strong>Đáp án: has been working</strong> — Nhấn mạnh tính liên tục → has been + V-ing + for.` },

  // Past Perfect (1)
  { test_number:2, topic:'Past Perfect', q:'When we got to the gate, the plane _____ already departed.', opts:['has','had','was','is'], ans:1,
    expl:`<span class="tag">Quá khứ hoàn thành</span><strong>Đáp án: had</strong> — Máy bay đi TRƯỚC khi chúng tôi đến cổng → had + V3.` },

  // Past Perfect Continuous (1)
  { test_number:2, topic:'Past Perfect Continuous', q:'He was exhausted because he _____ all night to finish the report.', opts:['works','worked','had been working','has worked'], ans:2,
    expl:`<span class="tag">Quá khứ hoàn thành tiếp diễn</span><strong>Đáp án: had been working</strong> — Hành động liên tục trước thời điểm quá khứ → had been + V-ing.` },

  // Future Forms (2)
  { test_number:2, topic:'Future Forms', q:'The conference _____ on the 15th of next month. It is in the diary.', opts:['is starting','starts','will start','start'], ans:1,
    expl:`<span class="tag">Hiện tại đơn – lịch trình</span><strong>Đáp án: starts</strong> — Sự kiện đã lên lịch cố định → hiện tại đơn.` },
  { test_number:2, topic:'Future Forms', q:"I think prices _____ rise next year because of inflation.", opts:['are going to','will','would','are'], ans:1,
    expl:`<span class="tag">Will – dự đoán</span><strong>Đáp án: will</strong> — Dự đoán không có bằng chứng hiện tại cụ thể (chỉ là ý kiến) → will.` },

  // Prepositions (1)
  { test_number:2, topic:'Prepositions', q:'The meeting is _____ Monday _____ 9 o\'clock _____ the morning.', opts:['on / at / in','in / at / on','on / in / at','at / on / in'], ans:0,
    expl:`<span class="tag">Giới từ</span><strong>Đáp án: on / at / in</strong> — Ngày trong tuần → on. Giờ cụ thể → at. Buổi sáng/chiều/tối → in.` },

  // Passive Voice (2)
  { test_number:2, topic:'Passive Voice', q:'The report _____ by the manager before it was sent.', opts:['checked','was checked','is checked','has checked'], ans:1,
    expl:`<span class="tag">Bị động – quá khứ đơn</span><strong>Đáp án: was checked</strong> — Bị động quá khứ đơn: was/were + V3.` },
  { test_number:2, topic:'Passive Voice', q:'The new policy _____ next week.', opts:['will announce','will be announced','is announcing','announces'], ans:1,
    expl:`<span class="tag">Bị động – tương lai</span><strong>Đáp án: will be announced</strong> — Bị động tương lai: will + be + V3.` },

  // Countable & Uncountable (1)
  { test_number:2, topic:'Countable and Uncountable Nouns', q:'She gave me some useful _____ about finding a job.', opts:['advice','advices','an advice','advise'], ans:0,
    expl:`<span class="tag">Danh từ không đếm được</span><strong>Đáp án: advice</strong> — "Advice" không đếm được, không có số nhiều. Dùng "some advice".` },

  // Articles (1)
  { test_number:2, topic:'Articles', q:'I saw _____ interesting documentary last night. _____ documentary was about climate change.', opts:['an / The','a / The','an / A','the / The'], ans:0,
    expl:`<span class="tag">Mạo từ</span><strong>Đáp án: an / The</strong> — Lần đầu đề cập → "an" (trước nguyên âm /ɪ/). Đề cập lần hai (đã biết) → "the".` },

  // Pronouns (1)
  { test_number:2, topic:'Pronouns', q:'The manager asked my colleague and _____ to stay after the meeting.', opts:['I','me','my','mine'], ans:1,
    expl:`<span class="tag">Đại từ</span><strong>Đáp án: me</strong> — Làm tân ngữ (asked me) → đại từ tân ngữ "me".` },

  // Possessive Determiners (1)
  { test_number:2, topic:'Possessive Determiners', q:'The children love _____ new school. _____ teachers are very kind.', opts:['their / Their','their / Its','its / Their','theirs / Their'], ans:0,
    expl:`<span class="tag">Tính từ sở hữu</span><strong>Đáp án: their / Their</strong> — Chủ sở hữu là "the children" (số nhiều) → "their".` },

  // Relative Clauses (1)
  { test_number:2, topic:'Relative Clauses', q:'The company _____ she works for is based in London.', opts:['who','which','whose','whom'], ans:1,
    expl:`<span class="tag">Mệnh đề quan hệ</span><strong>Đáp án: which</strong> — Vật/tổ chức (the company) → "which".` },

  // Reduced Relative Clauses (1)
  { test_number:2, topic:'Reduced Relative Clauses', q:'The documents _____ on my desk need to be signed today.', opts:['lay','lying','which lying','lain'], ans:1,
    expl:`<span class="tag">Mệnh đề quan hệ rút gọn</span><strong>Đáp án: lying</strong> — "Which are lying" rút gọn → V-ing.` },

  // Modals (2)
  { test_number:2, topic:'Modal Verbs', q:'_____ I use your computer for a moment? Mine is broken.', opts:['Must','Should','Could','Would'], ans:2,
    expl:`<span class="tag">Xin phép</span><strong>Đáp án: Could</strong> — Xin phép lịch sự → "Could I..." (lịch sự hơn "Can I...").` },
  { test_number:2, topic:'Modal Verbs', q:'You _____ wear a seatbelt in the car. It is the law.', opts:['should','ought to','must','would'], ans:2,
    expl:`<span class="tag">Bắt buộc</span><strong>Đáp án: must</strong> — Bắt buộc theo luật/nội quy → "must".` },

  // Modal Perfect (1)
  { test_number:2, topic:'Modal Perfect', q:"He _____ the deadline — the email was sent last week.", opts:['must miss','must have missed','should miss','may miss'], ans:1,
    expl:`<span class="tag">Modal perfect</span><strong>Đáp án: must have missed</strong> — Suy luận chắc chắn về quá khứ: must have + V3.` },

  // Questions (1)
  { test_number:2, topic:'Questions', q:'_____ does it take to fly from Hanoi to Singapore?', opts:['How long','How far','How much','How many'], ans:0,
    expl:`<span class="tag">Câu hỏi</span><strong>Đáp án: How long</strong> — Hỏi về thời gian → "How long".` },

  // Question Tags (1)
  { test_number:2, topic:'Question Tags', q:"You have been to Japan before, _____ ?", opts:["haven't you","have you","didn't you","weren't you"], ans:0,
    expl:`<span class="tag">Câu hỏi đuôi</span><strong>Đáp án: haven't you</strong> — Mệnh đề khẳng định (have been) → đuôi phủ định: haven't you.` },

  // Indirect Questions (1)
  { test_number:2, topic:'Indirect Questions', q:'Do you know _____ the next flight to Bangkok departs?', opts:['when','that','which','what'], ans:0,
    expl:`<span class="tag">Câu hỏi gián tiếp</span><strong>Đáp án: when</strong> — "When + S + V" (trật tự câu bình thường, không đảo ngữ).` },

  // So and Such (1)
  { test_number:2, topic:'So and Such', q:'It was _____ a long flight that everyone was exhausted.', opts:['so','such','too','very'], ans:1,
    expl:`<span class="tag">Such</span><strong>Đáp án: such</strong> — "Such + a/an + adj + noun + that". "So + adj + that".` },

  // Too and Enough (1)
  { test_number:2, topic:'Too and Enough', q:'She is not old _____ to apply for that job. You need to be 18.', opts:['too','enough','so','very'], ans:1,
    expl:`<span class="tag">Enough</span><strong>Đáp án: enough</strong> — "Adj + enough + to-V" = đủ ... để làm gì.` },

  // Comparatives (1)
  { test_number:2, topic:'Comparatives', q:'Taking the train is _____ than driving in heavy traffic.', opts:['more fast','faster','most fast','the fastest'], ans:1,
    expl:`<span class="tag">So sánh hơn</span><strong>Đáp án: faster</strong> — Tính từ ngắn (fast) → -er + than: faster than.` },

  // Superlatives (1)
  { test_number:2, topic:'Superlatives', q:'This is _____ hotel I have ever stayed in.', opts:['the most comfortable','the more comfortable','a most comfortable','most comfortable'], ans:0,
    expl:`<span class="tag">So sánh nhất</span><strong>Đáp án: the most comfortable</strong> — Tính từ dài → the most + adj.` },

  // Zero Conditional (1)
  { test_number:2, topic:'Conditionals', q:'If you _____ the app, it shows you the best route.', opts:['open','opened','will open','would open'], ans:0,
    expl:`<span class="tag">Điều kiện loại 0</span><strong>Đáp án: open</strong> — Sự thật / kết quả tất yếu: If + hiện tại đơn, hiện tại đơn.` },

  // First Conditional (1)
  { test_number:2, topic:'Conditionals', q:'If the meeting _____ early, we can go for lunch together.', opts:['finishes','finished','will finish','would finish'], ans:0,
    expl:`<span class="tag">Điều kiện loại 1</span><strong>Đáp án: finishes</strong> — Có thể xảy ra: If + hiện tại đơn, will + V.` },

  // Second Conditional (1)
  { test_number:2, topic:'Conditionals', q:'If she _____ the manager, she would change the office rules.', opts:['is','were','has been','would be'], ans:1,
    expl:`<span class="tag">Điều kiện loại 2</span><strong>Đáp án: were</strong> — Giả định không thật ở hiện tại: If + were, would + V.` },

  // Third Conditional (1)
  { test_number:2, topic:'Conditionals', q:'If we _____ earlier, we would have caught the flight.', opts:['left','had left','have left','would leave'], ans:1,
    expl:`<span class="tag">Điều kiện loại 3</span><strong>Đáp án: had left</strong> — Không thật ở quá khứ: If + had + V3, would have + V3.` },

  // Mixed Conditional (1)
  { test_number:2, topic:'Conditionals', q:'If I _____ that business, I would be retired by now.', opts:['sold','had sold','would sell','have sold'], ans:1,
    expl:`<span class="tag">Điều kiện hỗn hợp</span><strong>Đáp án: had sold</strong> — Nguyên nhân quá khứ → kết quả hiện tại: had + V3 / would + V.` },

  // Inverted Conditionals (1)
  { test_number:2, topic:'Inverted Conditionals', q:'_____ I known about the delay, I would have taken a different route.', opts:['Had','Should','Were','Did'], ans:0,
    expl:`<span class="tag">Đảo ngữ điều kiện</span><strong>Đáp án: Had</strong> — Đảo ngữ loại 3: Had + S + V3 (= If I had known...).` },

  // Unless / In case / As long as (1)
  { test_number:2, topic:'Unless / In case / As long as', q:'Take an umbrella _____ it rains on your way home.', opts:['in case','unless','as long as','although'], ans:0,
    expl:`<span class="tag">In case</span><strong>Đáp án: in case</strong> — "In case" = phòng khi (chuẩn bị trước cho tình huống có thể xảy ra).` },

  // Reported Speech (1)
  { test_number:2, topic:'Reported Speech', q:'"We will call you tomorrow," they said. → They said they _____ call me the next day.', opts:['will','would','could','should'], ans:1,
    expl:`<span class="tag">Câu tường thuật</span><strong>Đáp án: would</strong> — Lùi thì: will → would.` },

  // Reported Questions (1)
  { test_number:2, topic:'Reported Questions', q:'"Have you finished the report?" he asked. → He asked if I _____ the report.', opts:['finished','had finished','have finished','finish'], ans:1,
    expl:`<span class="tag">Câu hỏi tường thuật</span><strong>Đáp án: had finished</strong> — Lùi thì: have finished → had finished. Yes/No question → if/whether.` },

  // Reporting Verbs (1)
  { test_number:2, topic:'Reporting Verbs', q:'The manager _____ submitting the forms by Friday.', opts:['suggested','warned','told','said'], ans:0,
    expl:`<span class="tag">Động từ tường thuật</span><strong>Đáp án: suggested</strong> — "Suggest + V-ing" = đề nghị làm gì.` },

  // Direct & Indirect Objects (1)
  { test_number:2, topic:'Direct and Indirect Objects', q:'He sent _____ a detailed email about the project.', opts:['to us','us','for us','we'], ans:1,
    expl:`<span class="tag">Tân ngữ</span><strong>Đáp án: us</strong> — "Send + IO + DO": send us an email. IO đứng trước không cần "to".` },

  // Wish (1)
  { test_number:2, topic:'Wish', q:'I wish I _____ speak Japanese. It would help so much at work.', opts:['can','could','would','will'], ans:1,
    expl:`<span class="tag">Wish</span><strong>Đáp án: could</strong> — Mong muốn trái thực tế hiện tại về khả năng: wish + could + V.` },

  // Unreal Past (1)
  { test_number:2, topic:'Unreal Past', q:"It's high time the company _____ its website. It looks outdated.", opts:['updates','updated','to update','will update'], ans:1,
    expl:`<span class="tag">Quá khứ giả định</span><strong>Đáp án: updated</strong> — "It's high time + S + V quá khứ" = đã đến lúc (cần làm ngay).` },

  // Contrast Structures (1)
  { test_number:2, topic:'Contrast Structures', q:'_____ the heavy traffic, she arrived on time.', opts:['In spite of','Although','However','Even though'], ans:0,
    expl:`<span class="tag">Cấu trúc đối lập</span><strong>Đáp án: In spite of</strong> — "In spite of / Despite" + danh từ/V-ing. "Although/Even though" + mệnh đề.` },

  // -ing / Infinitive (1)
  { test_number:2, topic:'-ing Form and Infinitive', q:'He enjoys _____ to new countries whenever he gets a chance.', opts:['to travel','travelling','travel','travelled'], ans:1,
    expl:`<span class="tag">Gerund</span><strong>Đáp án: travelling</strong> — "Enjoy" → V-ing (gerund): enjoy + V-ing.` },

  // Verb patterns – meaning change (1)
  { test_number:2, topic:'Verb Patterns (meaning change)', q:'Please remember _____ the door when you leave. It must be locked.', opts:['locking','to lock','lock','locked'], ans:1,
    expl:`<span class="tag">Nghĩa thay đổi</span><strong>Đáp án: to lock</strong> — "Remember to-V" = nhớ phải làm (việc chưa làm). "Remember V-ing" = nhớ lại đã làm.` },

  // Verb Patterns (1)
  { test_number:2, topic:'Verb Patterns', q:'The company let its employees _____ from home twice a week.', opts:['work','to work','working','worked'], ans:0,
    expl:`<span class="tag">Verb patterns</span><strong>Đáp án: work</strong> — "Let + O + V nguyên thể" (không có "to").` },

  // Both / Either / Neither (1)
  { test_number:2, topic:'Both / Either / Neither / So / Nor', q:'"I enjoyed the conference." "_____ did I. It was excellent."', opts:['So','Neither','Both','Either'], ans:0,
    expl:`<span class="tag">So / Nor</span><strong>Đáp án: So</strong> — Đồng ý với câu khẳng định: "So + trợ động từ + S" = tôi cũng vậy.` },

  // Connectives (1)
  { test_number:2, topic:'Connectives', q:'The hotel was expensive. _____, the service was very poor.', opts:['Moreover','Therefore','However','Although'], ans:2,
    expl:`<span class="tag">Connectives</span><strong>Đáp án: However</strong> — Đối lập với ý trước → "However" (tuy nhiên).` },

  // Causative (1)
  { test_number:2, topic:'Causative', q:'She _____ her suit dry-cleaned before the important meeting.', opts:['made','did','had','let'], ans:2,
    expl:`<span class="tag">Causative</span><strong>Đáp án: had</strong> — "Have + O + V3" = nhờ/thuê người khác làm gì.` },

  // Prefer / Would Rather / Had Better (1)
  { test_number:2, topic:'Prefer / Would Rather / Had Better', q:'I _____ take the train than drive in this traffic.', opts:['had better','would rather','prefer','used to'], ans:1,
    expl:`<span class="tag">Would rather</span><strong>Đáp án: would rather</strong> — "Would rather + V" = thích làm điều này hơn. "Would rather A than B".` },

  // Infinitives of Purpose (1)
  { test_number:2, topic:'Infinitives of Purpose', q:'He took a taxi _____ the airport on time.', opts:['to reach','for reaching','for reach','reaching'], ans:0,
    expl:`<span class="tag">Infinitive mục đích</span><strong>Đáp án: to reach</strong> — "To + V" diễn tả mục đích hành động.` },

  // Participles (1)
  { test_number:2, topic:'Participles', q:'_____ in Tokyo for ten years, she speaks Japanese fluently.', opts:['Living','Lived','Having lived','To live'], ans:2,
    expl:`<span class="tag">Phân từ hoàn thành</span><strong>Đáp án: Having lived</strong> — "Having + V3" diễn tả hành động xảy ra TRƯỚC hành động chính.` },

  // Inversions (1)
  { test_number:2, topic:'Inversions', q:'Not only _____ late, but he also forgot all the documents.', opts:['he arrived','arrived he','did he arrive','he did arrive'], ans:2,
    expl:`<span class="tag">Đảo ngữ</span><strong>Đáp án: did he arrive</strong> — "Not only" đứng đầu → đảo ngữ: Not only + did + S + V.` },

  // Possessives (1)
  { test_number:2, topic:'Possessives', q:"This isn't my laptop. I think it's _____ — he left it on the desk.", opts:["Mark's",'of Mark','Marks',"Marks'"], ans:0,
    expl:`<span class="tag">Sở hữu cách</span><strong>Đáp án: Mark's</strong> — Sở hữu cách: tên riêng số ít + 's.` },

  // Quantifiers (1)
  { test_number:2, topic:'Quantifiers', q:'There is _____ traffic on the road this morning — it is completely clear.', opts:['little','a little','few','a few'], ans:0,
    expl:`<span class="tag">Lượng từ</span><strong>Đáp án: little</strong> — "Little" = rất ít (tiêu cực). Dùng với danh từ không đếm được (traffic).` },

  // Prepositional Phrases (1)
  { test_number:2, topic:'Prepositional Phrases', q:'The project is _____ schedule — everything is going to plan.', opts:['on','in','at','by'], ans:0,
    expl:`<span class="tag">Cụm giới từ</span><strong>Đáp án: on</strong> — Cố định: "on schedule" = đúng tiến độ.` },

  // Word Formation (1)
  { test_number:2, topic:'Word Formation', q:'The new policy will _____ (simple) the application process.', opts:['simple','simply','simplify','simpleness'], ans:2,
    expl:`<span class="tag">Cấu tạo từ</span><strong>Đáp án: simplify</strong> — Vị trí cần động từ: simple (adj) + -ify → simplify (verb = làm đơn giản hóa).` },

  // Phrasal Verbs (1)
  { test_number:2, topic:'Phrasal Verbs', q:'The meeting has been _____ until next Thursday due to a schedule conflict.', opts:['put off','put out','put up','put on'], ans:0,
    expl:`<span class="tag">Cụm động từ</span><strong>Đáp án: put off</strong> — "Put off" = hoãn lại.` },

  // Collocations (1)
  { test_number:2, topic:'Collocations', q:'She _____ a lot of progress in her English over the past year.', opts:['did','made','took','had'], ans:1,
    expl:`<span class="tag">Collocations</span><strong>Đáp án: made</strong> — Cố định: "make progress" = tiến bộ.` },
]

async function main() {
  const batchSize = 20
  for (let i = 0; i < QUESTIONS.length; i += batchSize) {
    const batch = QUESTIONS.slice(i, i + batchSize)
    const { error } = await supabase.from('questions').insert(batch)
    if (error) { console.error(`Batch ${Math.floor(i/batchSize)+1} error:`, error.message); process.exit(1) }
    console.log(`Batch ${Math.floor(i/batchSize)+1} inserted (${batch.length} questions)`)
  }
  console.log(`Done! ${QUESTIONS.length} questions inserted for Test 2.`)
}

main()
