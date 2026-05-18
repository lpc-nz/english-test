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
  { test_number:1, topic:'Present Simple', q:'She _____ coffee every morning before work.', opts:['drink','drinks','is drinking','drank'], ans:1,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: drinks</strong> — Thói quen lặp lại → hiện tại đơn. She (ngôi 3 số ít) → thêm <strong>-s</strong>.` },
  { test_number:1, topic:'Present Simple', q:'Water _____ at 100 degrees Celsius.', opts:['boil','boils','is boiling','boiled'], ans:1,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: boils</strong> — Sự thật khoa học → hiện tại đơn. Water → boils.` },

  // Present Continuous (1)
  { test_number:1, topic:'Present Continuous', q:"Quiet! The baby _____ right now.", opts:['sleeps','slept','is sleeping','has slept'], ans:2,
    expl:`<span class="tag">Hiện tại tiếp diễn</span><strong>Đáp án: is sleeping</strong> — Đang xảy ra tại thời điểm nói → is/am/are + V-ing.` },

  // Stative Verbs (1)
  { test_number:1, topic:'Stative Verbs', q:'I _____ this song. It is so beautiful.', opts:['am loving','love','loved','have loved'], ans:1,
    expl:`<span class="tag">Động từ trạng thái</span><strong>Đáp án: love</strong> — "Love" là động từ trạng thái, không dùng dạng tiếp diễn.` },

  // Past Simple (2)
  { test_number:1, topic:'Past Simple', q:'They _____ to the beach last summer.', opts:['go','have gone','went','were going'], ans:2,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: went</strong> — "Last summer" = thời điểm xác định trong quá khứ → quá khứ đơn.` },
  { test_number:1, topic:'Past Simple', q:'She _____ her homework before dinner yesterday.', opts:['finishes','has finished','finished','was finishing'], ans:2,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: finished</strong> — "Yesterday" = thời điểm quá khứ cụ thể → V-ed.` },

  // Past Continuous (1)
  { test_number:1, topic:'Past Continuous', q:'I _____ TV when the power cut happened.', opts:['watched','was watching','have watched','watch'], ans:1,
    expl:`<span class="tag">Quá khứ tiếp diễn</span><strong>Đáp án: was watching</strong> — Hành động đang xảy ra (was watching) bị gián đoạn bởi sự kiện khác.` },

  // Used to (1)
  { test_number:1, topic:'Used to', q:'He _____ smoke, but he stopped five years ago.', opts:['used to','is used to','uses to','was used to'], ans:0,
    expl:`<span class="tag">Used to</span><strong>Đáp án: used to</strong> — Thói quen trong quá khứ, nay không còn → used to + V nguyên thể.` },

  // Present Perfect (1)
  { test_number:1, topic:'Present Perfect', q:'I _____ never tried sushi before. This is my first time.', opts:['have','had','has','am'], ans:0,
    expl:`<span class="tag">Hiện tại hoàn thành</span><strong>Đáp án: have</strong> — Kinh nghiệm chưa xác định thời điểm: have/has + V3. "Never" thường dùng với thì này.` },

  // Present Perfect Continuous (1)
  { test_number:1, topic:'Present Perfect Continuous', q:'She _____ in this city for ten years and loves it here.', opts:['lived','has lived','has been living','is living'], ans:2,
    expl:`<span class="tag">Hiện tại hoàn thành tiếp diễn</span><strong>Đáp án: has been living</strong> — Nhấn mạnh tính liên tục từ quá khứ đến hiện tại → has/have been + V-ing.` },

  // Past Perfect (1)
  { test_number:1, topic:'Past Perfect', q:'By the time we arrived, the film _____ already started.', opts:['has','had','was','is'], ans:1,
    expl:`<span class="tag">Quá khứ hoàn thành</span><strong>Đáp án: had</strong> — Phim bắt đầu TRƯỚC khi chúng tôi đến → had + V3.` },

  // Past Perfect Continuous (1)
  { test_number:1, topic:'Past Perfect Continuous', q:'She was tired because she _____ all day.', opts:['works','worked','had been working','has worked'], ans:2,
    expl:`<span class="tag">Quá khứ hoàn thành tiếp diễn</span><strong>Đáp án: had been working</strong> — Hành động kéo dài liên tục trước thời điểm quá khứ → had been + V-ing.` },

  // Future Forms (2)
  { test_number:1, topic:'Future Forms', q:"A: The phone is ringing. B: I _____ answer it.", opts:['am going to','will','going to','would'], ans:1,
    expl:`<span class="tag">Will – quyết định tức thì</span><strong>Đáp án: will</strong> — Quyết định ngay lúc nói (không có kế hoạch trước) → will + V.` },
  { test_number:1, topic:'Future Forms', q:'Look at those dark clouds. It _____ rain soon.', opts:['is going to','will','rains','rained'], ans:0,
    expl:`<span class="tag">Be going to – dự đoán</span><strong>Đáp án: is going to</strong> — Có bằng chứng hiện tại (mây đen) → dự đoán có cơ sở → be going to.` },

  // Prepositions of time & place (1)
  { test_number:1, topic:'Prepositions', q:'She was born _____ July, _____ a small town in the south.', opts:['in / in','on / in','in / at','at / in'], ans:0,
    expl:`<span class="tag">Giới từ</span><strong>Đáp án: in / in</strong> — Tháng → "in". Thành phố/thị trấn → "in".` },

  // Passive Voice (2)
  { test_number:1, topic:'Passive Voice', q:'This book _____ by millions of people every year.', opts:['reads','is reading','is read','read'], ans:2,
    expl:`<span class="tag">Bị động – hiện tại đơn</span><strong>Đáp án: is read</strong> — Bị động hiện tại đơn: is/am/are + V3.` },
  { test_number:1, topic:'Passive Voice', q:'The new bridge _____ next year.', opts:['will build','will be built','is building','builds'], ans:1,
    expl:`<span class="tag">Bị động – tương lai</span><strong>Đáp án: will be built</strong> — Bị động tương lai: will + be + V3.` },

  // Countable & Uncountable (1)
  { test_number:1, topic:'Countable and Uncountable Nouns', q:'Can I have _____ milk, please?', opts:['a','an','some','many'], ans:2,
    expl:`<span class="tag">Danh từ không đếm được</span><strong>Đáp án: some</strong> — "Milk" không đếm được → dùng "some" (không dùng a/an/many).` },

  // Articles (1)
  { test_number:1, topic:'Articles', q:'He is _____ honest man. Everyone respects him.', opts:['a','an','the','—'], ans:1,
    expl:`<span class="tag">Mạo từ</span><strong>Đáp án: an</strong> — "Honest" bắt đầu bằng nguyên âm /ɒ/ → dùng "an".` },

  // Pronouns (1)
  { test_number:1, topic:'Pronouns', q:'Tom and _____ went to the cinema last night.', opts:['I','me','my','mine'], ans:0,
    expl:`<span class="tag">Đại từ</span><strong>Đáp án: I</strong> — Làm chủ ngữ → đại từ chủ ngữ "I" (không dùng "me").` },

  // Possessive Determiners (1)
  { test_number:1, topic:'Possessive Determiners', q:'She left _____ bag on the bus this morning.', opts:['her','hers','she',"she's"], ans:0,
    expl:`<span class="tag">Tính từ sở hữu</span><strong>Đáp án: her</strong> — Trước danh từ (bag) → tính từ sở hữu "her". "Hers" là đại từ sở hữu (đứng một mình).` },

  // Relative Clauses (1)
  { test_number:1, topic:'Relative Clauses', q:'The man _____ lives next door is a doctor.', opts:['who','which','whose','whom'], ans:0,
    expl:`<span class="tag">Mệnh đề quan hệ</span><strong>Đáp án: who</strong> — Người làm chủ ngữ trong mệnh đề quan hệ → "who".` },

  // Reduced Relative Clauses (1)
  { test_number:1, topic:'Reduced Relative Clauses', q:'The man _____ at the front desk will help you.', opts:['sat','sitting','who sitting','sits'], ans:1,
    expl:`<span class="tag">Mệnh đề quan hệ rút gọn</span><strong>Đáp án: sitting</strong> — "Who is sitting" rút gọn → V-ing (phân từ hiện tại).` },

  // Modals (2)
  { test_number:1, topic:'Modal Verbs', q:'She _____ speak French fluently — she grew up in Paris.', opts:['can','could','should','must'], ans:0,
    expl:`<span class="tag">Khả năng</span><strong>Đáp án: can</strong> — Khả năng ở hiện tại → "can".` },
  { test_number:1, topic:'Modal Verbs', q:'You _____ eat in the library. It is strictly forbidden.', opts:["shouldn't","couldn't","mustn't","needn't"], ans:2,
    expl:`<span class="tag">Cấm đoán</span><strong>Đáp án: mustn't</strong> — Cấm tuyệt đối → mustn't.` },

  // Modal Perfect (1)
  { test_number:1, topic:'Modal Perfect', q:"She can't _____ the email — she never checks her phone.", opts:['read','have read','be reading','reads'], ans:1,
    expl:`<span class="tag">Modal perfect</span><strong>Đáp án: have read</strong> — Suy luận phủ định về quá khứ: can't have + V3.` },

  // Questions (1)
  { test_number:1, topic:'Questions', q:'_____ did you go on holiday last year?', opts:['Where','What','Who','Which'], ans:0,
    expl:`<span class="tag">Câu hỏi</span><strong>Đáp án: Where</strong> — Hỏi về địa điểm → "Where".` },

  // Question Tags (1)
  { test_number:1, topic:'Question Tags', q:"She doesn't know the answer, _____ ?", opts:['does she',"doesn't she",'did she','is she'], ans:0,
    expl:`<span class="tag">Câu hỏi đuôi</span><strong>Đáp án: does she</strong> — Mệnh đề phủ định → đuôi khẳng định. Hiện tại đơn → does she.` },

  // Indirect Questions (1)
  { test_number:1, topic:'Indirect Questions', q:'Could you tell me _____ the nearest bank is?', opts:['where','what','how','that'], ans:0,
    expl:`<span class="tag">Câu hỏi gián tiếp</span><strong>Đáp án: where</strong> — Câu hỏi gián tiếp: wh-word + S + V (không đảo ngữ).` },

  // So and Such (1)
  { test_number:1, topic:'So and Such', q:'The film was _____ boring that I fell asleep.', opts:['so','such','too','very'], ans:0,
    expl:`<span class="tag">So / Such</span><strong>Đáp án: so</strong> — "So" + tính từ + that. "Such" + (a/an) + danh từ + that.` },

  // Too and Enough (1)
  { test_number:1, topic:'Too and Enough', q:'This coffee is _____ hot to drink. Wait a few minutes.', opts:['too','enough','so','very'], ans:0,
    expl:`<span class="tag">Too / Enough</span><strong>Đáp án: too</strong> — "Too + adj + to-V" = quá ... đến mức không thể làm gì.` },

  // Comparatives (1)
  { test_number:1, topic:'Comparatives', q:'City life is _____ than life in the countryside.', opts:['more busy','busier','most busy','the busiest'], ans:1,
    expl:`<span class="tag">So sánh hơn</span><strong>Đáp án: busier</strong> — Tính từ ngắn (busy) → -ier + than.` },

  // Superlatives (1)
  { test_number:1, topic:'Superlatives', q:'It was _____ meal I have ever eaten.', opts:['the most delicious','the more delicious','a most delicious','most delicious'], ans:0,
    expl:`<span class="tag">So sánh nhất</span><strong>Đáp án: the most delicious</strong> — Tính từ dài → the most + adj.` },

  // Zero Conditional (1)
  { test_number:1, topic:'Conditionals', q:'If you _____ water to 0°C, it turns into ice.', opts:['cool','cooled','will cool','would cool'], ans:0,
    expl:`<span class="tag">Điều kiện loại 0</span><strong>Đáp án: cool</strong> — Sự thật hiển nhiên: If + hiện tại đơn, hiện tại đơn.` },

  // First Conditional (1)
  { test_number:1, topic:'Conditionals', q:'If it _____ tomorrow, we will cancel the picnic.', opts:['rains','rained','rain','will rain'], ans:0,
    expl:`<span class="tag">Điều kiện loại 1</span><strong>Đáp án: rains</strong> — Có thể xảy ra: If + hiện tại đơn, will + V.` },

  // Second Conditional (1)
  { test_number:1, topic:'Conditionals', q:'If I _____ rich, I would travel the world.', opts:['am','were','was','would be'], ans:1,
    expl:`<span class="tag">Điều kiện loại 2</span><strong>Đáp án: were</strong> — Giả định không thật ở hiện tại: If + were, would + V.` },

  // Third Conditional (1)
  { test_number:1, topic:'Conditionals', q:'If she _____ harder, she would have passed the exam.', opts:['had studied','has studied','studied','would have studied'], ans:0,
    expl:`<span class="tag">Điều kiện loại 3</span><strong>Đáp án: had studied</strong> — Không thật ở quá khứ: If + had + V3, would have + V3.` },

  // Mixed Conditional (1)
  { test_number:1, topic:'Conditionals', q:'If I _____ the right course, I would be a doctor now.', opts:['chose','had chosen','would choose','choose'], ans:1,
    expl:`<span class="tag">Điều kiện hỗn hợp</span><strong>Đáp án: had chosen</strong> — Nguyên nhân quá khứ (had chosen) + kết quả hiện tại (would be now).` },

  // Inverted Conditionals (1)
  { test_number:1, topic:'Inverted Conditionals', q:'_____ you need any help, please do not hesitate to ask.', opts:['Should','Would','Could','Were'], ans:0,
    expl:`<span class="tag">Đảo ngữ điều kiện</span><strong>Đáp án: Should</strong> — Đảo ngữ loại 1: Should + S + V (= If you should need...).` },

  // Unless / In case / As long as (1)
  { test_number:1, topic:'Unless / In case / As long as', q:'You can borrow my car _____ you drive carefully.', opts:['as long as','unless','in case','although'], ans:0,
    expl:`<span class="tag">As long as</span><strong>Đáp án: as long as</strong> — "As long as" = miễn là (điều kiện cần). "Unless" = trừ khi.` },

  // Reported Speech (1)
  { test_number:1, topic:'Reported Speech', q:'"I am tired," he said. → He said that he _____ tired.', opts:['was','is','has been','would be'], ans:0,
    expl:`<span class="tag">Câu tường thuật</span><strong>Đáp án: was</strong> — Lùi thì: is → was.` },

  // Reported Questions (1)
  { test_number:1, topic:'Reported Questions', q:'"Where do you live?" she asked. → She asked where I _____.', opts:['lived','live','was living','did live'], ans:0,
    expl:`<span class="tag">Câu hỏi tường thuật</span><strong>Đáp án: lived</strong> — Lùi thì (do → lived). Trật tự từ: S + V (không đảo ngữ).` },

  // Reporting Verbs (1)
  { test_number:1, topic:'Reporting Verbs', q:'She _____ me not to touch the hot stove.', opts:['warned','suggested','mentioned','explained'], ans:0,
    expl:`<span class="tag">Động từ tường thuật</span><strong>Đáp án: warned</strong> — "Warn + O + not to-V" = cảnh báo ai không làm gì.` },

  // Direct and Indirect Objects (1)
  { test_number:1, topic:'Direct and Indirect Objects', q:'She gave _____ a beautiful birthday gift.', opts:['to me','me','for me','I'], ans:1,
    expl:`<span class="tag">Tân ngữ</span><strong>Đáp án: me</strong> — "Give + IO + DO": give me a gift. Tân ngữ gián tiếp đứng trước, không dùng "to".` },

  // Wish (1)
  { test_number:1, topic:'Wish', q:'I wish I _____ taller. All my friends are taller than me.', opts:['am','was','were','would be'], ans:2,
    expl:`<span class="tag">Wish</span><strong>Đáp án: were</strong> — Mong muốn trái thực tế ở hiện tại: wish + were (chuẩn với mọi ngôi).` },

  // Unreal Past (1)
  { test_number:1, topic:'Unreal Past', q:"It's time we _____. It's getting very late.", opts:['leave','left','to leave','would leave'], ans:1,
    expl:`<span class="tag">Quá khứ giả định</span><strong>Đáp án: left</strong> — "It's time + S + V quá khứ" = đã đến lúc phải làm gì.` },

  // Contrast Structures (1)
  { test_number:1, topic:'Contrast Structures', q:'_____ it was raining, we decided to go for a walk.', opts:['Although','However','Despite','Because'], ans:0,
    expl:`<span class="tag">Cấu trúc đối lập</span><strong>Đáp án: Although</strong> — "Although" + mệnh đề (S+V). "Despite/In spite of" + danh từ/V-ing.` },

  // -ing / Infinitive (1)
  { test_number:1, topic:'-ing Form and Infinitive', q:'She decided _____ a new language after her trip abroad.', opts:['learning','to learn','learn','having learnt'], ans:1,
    expl:`<span class="tag">Infinitive</span><strong>Đáp án: to learn</strong> — "Decide" → to-infinitive: decide to + V.` },

  // Verb patterns – meaning change (1)
  { test_number:1, topic:'Verb Patterns (meaning change)', q:'I remember _____ the oven off. The kitchen smells fine.', opts:['to turn','turning','turn','turned'], ans:1,
    expl:`<span class="tag">Nghĩa thay đổi</span><strong>Đáp án: turning</strong> — "Remember + V-ing" = nhớ lại đã làm (việc đã xảy ra). "Remember to-V" = nhớ phải làm.` },

  // Verb Patterns (1)
  { test_number:1, topic:'Verb Patterns', q:'His parents made him _____ his room before going out.', opts:['clean','to clean','cleaning','cleaned'], ans:0,
    expl:`<span class="tag">Verb patterns</span><strong>Đáp án: clean</strong> — "Make + O + V nguyên thể" (không có "to").` },

  // Both / Either / Neither (1)
  { test_number:1, topic:'Both / Either / Neither / So / Nor', q:'_____ of the two answers is correct. They are both wrong.', opts:['Neither','Either','Both','None'], ans:0,
    expl:`<span class="tag">Neither</span><strong>Đáp án: Neither</strong> — "Neither of + danh từ số nhiều + V số ít" = không cái nào (trong hai).` },

  // Connectives (1)
  { test_number:1, topic:'Connectives', q:'She studied very hard. _____, she passed all her exams.', opts:['Therefore','However','Although','Despite'], ans:0,
    expl:`<span class="tag">Connectives</span><strong>Đáp án: Therefore</strong> — Kết quả tất yếu → "Therefore" (do đó).` },

  // Causative (1)
  { test_number:1, topic:'Causative', q:'We need to _____ the house painted before winter arrives.', opts:['make','do','have','let'], ans:2,
    expl:`<span class="tag">Causative</span><strong>Đáp án: have</strong> — "Have + O + V3" = nhờ người khác làm gì cho mình.` },

  // Prefer / Would Rather / Had Better (1)
  { test_number:1, topic:'Prefer / Would Rather / Had Better', q:"You _____ see a doctor. Your cough sounds very bad.", opts:['had better','would rather','prefer','used to'], ans:0,
    expl:`<span class="tag">Had better</span><strong>Đáp án: had better</strong> — "Had better + V" = nên làm (có hàm ý cảnh báo hậu quả nếu không làm).` },

  // Infinitives of Purpose (1)
  { test_number:1, topic:'Infinitives of Purpose', q:'She went to the library _____ some books for her project.', opts:['to borrow','for borrowing','for borrow','borrowing'], ans:0,
    expl:`<span class="tag">Infinitive mục đích</span><strong>Đáp án: to borrow</strong> — "To + V" diễn tả mục đích.` },

  // Participles (1)
  { test_number:1, topic:'Participles', q:'_____ the door carefully, she walked inside.', opts:['Opening','Opened','Having to open','To open'], ans:0,
    expl:`<span class="tag">Phân từ</span><strong>Đáp án: Opening</strong> — Phân từ hiện tại (V-ing) làm trạng ngữ, cùng chủ ngữ với mệnh đề chính.` },

  // Inversions (1)
  { test_number:1, topic:'Inversions', q:'Never _____ such a beautiful sunset before.', opts:['have I seen','I have seen','I saw','did I see'], ans:0,
    expl:`<span class="tag">Đảo ngữ</span><strong>Đáp án: have I seen</strong> — "Never" đứng đầu câu → đảo ngữ: Never + trợ động từ + S + V.` },

  // Possessives (1)
  { test_number:1, topic:'Possessives', q:"That is not my pen. It must be _____.", opts:["John's",'of John','Johns',"Johns'"], ans:0,
    expl:`<span class="tag">Sở hữu cách</span><strong>Đáp án: John's</strong> — Sở hữu cách của danh từ riêng số ít: thêm 's.` },

  // Quantifiers (1)
  { test_number:1, topic:'Quantifiers', q:'There are _____ students in our class — only twelve.', opts:['few','a few','little','a little'], ans:0,
    expl:`<span class="tag">Lượng từ</span><strong>Đáp án: few</strong> — "Few" = rất ít (tiêu cực, không đủ). Dùng với danh từ đếm được số nhiều.` },

  // Prepositional Phrases (1)
  { test_number:1, topic:'Prepositional Phrases', q:'She is very good _____ solving maths problems.', opts:['at','in','on','for'], ans:0,
    expl:`<span class="tag">Cụm giới từ</span><strong>Đáp án: at</strong> — Cố định: "be good at" = giỏi về điều gì.` },

  // Word Formation (1)
  { test_number:1, topic:'Word Formation', q:'She speaks very _____ (clear). I can understand every word.', opts:['clear','clearly','clearness','clearer'], ans:1,
    expl:`<span class="tag">Cấu tạo từ</span><strong>Đáp án: clearly</strong> — Bổ nghĩa cho động từ (speaks) → trạng từ: clear + -ly = clearly.` },

  // Phrasal Verbs (1)
  { test_number:1, topic:'Phrasal Verbs', q:'She _____ her old school friend at the shopping centre.', opts:['ran into','ran for','ran out','ran up'], ans:0,
    expl:`<span class="tag">Cụm động từ</span><strong>Đáp án: ran into</strong> — "Run into" = tình cờ gặp ai.` },

  // Collocations (1)
  { test_number:1, topic:'Collocations', q:'He _____ a deep breath before his presentation.', opts:['did','made','took','had'], ans:2,
    expl:`<span class="tag">Collocations</span><strong>Đáp án: took</strong> — Cố định: "take a deep breath" = hít thở sâu.` },
]

async function main() {
  const batchSize = 20
  for (let i = 0; i < QUESTIONS.length; i += batchSize) {
    const batch = QUESTIONS.slice(i, i + batchSize)
    const { error } = await supabase.from('questions').insert(batch)
    if (error) { console.error(`Batch ${Math.floor(i/batchSize)+1} error:`, error.message); process.exit(1) }
    console.log(`Batch ${Math.floor(i/batchSize)+1} inserted (${batch.length} questions)`)
  }
  console.log(`Done! ${QUESTIONS.length} questions inserted for Test 1.`)
}

main()
