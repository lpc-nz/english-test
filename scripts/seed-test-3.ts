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
  { test_number:3, topic:'Present Simple', q:'My brother _____ football every weekend with his friends.', opts:['play','plays','is playing','played'], ans:1,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: plays</strong> — Thói quen lặp lại (every weekend). My brother (số ít) → plays.` },
  { test_number:3, topic:'Present Simple', q:'The museum _____ at 9 am and closes at 6 pm daily.', opts:['open','opens','is opening','opened'], ans:1,
    expl:`<span class="tag">Hiện tại đơn</span><strong>Đáp án: opens</strong> — Giờ mở cửa cố định → hiện tại đơn. The museum (số ít) → opens.` },

  // Present Continuous (1)
  { test_number:3, topic:'Present Continuous', q:'She _____ yoga classes this month to get fit.', opts:['takes','took','is taking','has taken'], ans:2,
    expl:`<span class="tag">Hiện tại tiếp diễn</span><strong>Đáp án: is taking</strong> — Hoạt động tạm thời đang diễn ra trong giai đoạn này → is/am/are + V-ing.` },

  // Stative Verbs (1)
  { test_number:3, topic:'Stative Verbs', q:'I _____ what you mean, but I still disagree.', opts:['am understanding','understand','understood','have understood'], ans:1,
    expl:`<span class="tag">Động từ trạng thái</span><strong>Đáp án: understand</strong> — "Understand" là động từ trạng thái, không dùng tiếp diễn.` },

  // Past Simple (2)
  { test_number:3, topic:'Past Simple', q:'He _____ his first marathon last year and felt amazing.', opts:['runs','has run','ran','was running'], ans:2,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: ran</strong> — "Last year" = thời điểm quá khứ xác định → quá khứ đơn.` },
  { test_number:3, topic:'Past Simple', q:'The team _____ the championship three times in a row.', opts:['wins','has won','won','is winning'], ans:2,
    expl:`<span class="tag">Quá khứ đơn</span><strong>Đáp án: won</strong> — Chuỗi sự kiện hoàn thành trong quá khứ → quá khứ đơn.` },

  // Past Continuous (1)
  { test_number:3, topic:'Past Continuous', q:'He _____ in the park when it suddenly started to rain.', opts:['jogged','was jogging','has jogged','jogs'], ans:1,
    expl:`<span class="tag">Quá khứ tiếp diễn</span><strong>Đáp án: was jogging</strong> — Hành động đang xảy ra bị gián đoạn → was/were + V-ing.` },

  // Used to (1)
  { test_number:3, topic:'Used to', q:'She _____ play tennis every day, but she gave it up after her injury.', opts:['used to','is used to','uses to','would used to'], ans:0,
    expl:`<span class="tag">Used to</span><strong>Đáp án: used to</strong> — Thói quen/hoạt động trong quá khứ, nay không còn → used to + V.` },

  // Present Perfect (1)
  { test_number:3, topic:'Present Perfect', q:'He _____ just broken his personal record in the 100-metre race.', opts:['is','has','have','had'], ans:1,
    expl:`<span class="tag">Hiện tại hoàn thành</span><strong>Đáp án: has</strong> — "Just" + present perfect: has + V3. He (số ít) → has.` },

  // Present Perfect Continuous (1)
  { test_number:3, topic:'Present Perfect Continuous', q:'They _____ football since they were six years old.', opts:['played','have played','have been playing','are playing'], ans:2,
    expl:`<span class="tag">Hiện tại hoàn thành tiếp diễn</span><strong>Đáp án: have been playing</strong> — Nhấn mạnh tính liên tục từ quá khứ → have been + V-ing.` },

  // Past Perfect (1)
  { test_number:3, topic:'Past Perfect', q:'She felt confident because she _____ for weeks before the race.', opts:['trains','trained','had trained','has trained'], ans:2,
    expl:`<span class="tag">Quá khứ hoàn thành</span><strong>Đáp án: had trained</strong> — Luyện tập TRƯỚC khi cảm thấy tự tin → had + V3.` },

  // Past Perfect Continuous (1)
  { test_number:3, topic:'Past Perfect Continuous', q:'His muscles ached because he _____ for hours without a break.', opts:['swims','swam','had been swimming','has swum'], ans:2,
    expl:`<span class="tag">Quá khứ hoàn thành tiếp diễn</span><strong>Đáp án: had been swimming</strong> — Hoạt động liên tục trước thời điểm quá khứ → had been + V-ing.` },

  // Future Forms (2)
  { test_number:3, topic:'Future Forms', q:'The marathon _____ on Sunday at 7 am sharp. It is on the official calendar.', opts:['is taking place','takes place','will take place','took place'], ans:1,
    expl:`<span class="tag">Hiện tại đơn – lịch trình</span><strong>Đáp án: takes place</strong> — Sự kiện đã lên lịch cố định → hiện tại đơn.` },
  { test_number:3, topic:'Future Forms', q:"She has been training hard all month. She _____ win.", opts:['is going to','will','would','is'], ans:0,
    expl:`<span class="tag">Be going to</span><strong>Đáp án: is going to</strong> — Bằng chứng hiện tại (đang luyện tập chăm chỉ) → dự đoán có cơ sở → be going to.` },

  // Prepositions (1)
  { test_number:3, topic:'Prepositions', q:'The gym is _____ the corner of Baker Street, next _____ the supermarket.', opts:['on / to','in / to','at / to','on / of'], ans:0,
    expl:`<span class="tag">Giới từ</span><strong>Đáp án: on / to</strong> — "On the corner" = ở góc đường (cố định). "Next to" = bên cạnh.` },

  // Passive Voice (2)
  { test_number:3, topic:'Passive Voice', q:'The world record _____ in 2009 by Usain Bolt.', opts:['broke','was broken','is broken','has broken'], ans:1,
    expl:`<span class="tag">Bị động – quá khứ đơn</span><strong>Đáp án: was broken</strong> — Bị động quá khứ đơn: was/were + V3.` },
  { test_number:3, topic:'Passive Voice', q:'The new sports centre _____ for the past six months.', opts:['is building','has been built','has been building','builds'], ans:1,
    expl:`<span class="tag">Bị động – hiện tại hoàn thành</span><strong>Đáp án: has been built</strong> — Bị động hiện tại hoàn thành: has/have + been + V3.` },

  // Countable & Uncountable (1)
  { test_number:3, topic:'Countable and Uncountable Nouns', q:'You need a lot of _____ to run a marathon.', opts:['strengths','strength','a strength','many strength'], ans:1,
    expl:`<span class="tag">Danh từ không đếm được</span><strong>Đáp án: strength</strong> — "Strength" không đếm được → không thêm -s.` },

  // Articles (1)
  { test_number:3, topic:'Articles', q:'She plays _____ guitar in _____ band that performs every Friday.', opts:['the / a','a / the','— / a','the / the'], ans:0,
    expl:`<span class="tag">Mạo từ</span><strong>Đáp án: the / a</strong> — Nhạc cụ → "the guitar". Lần đầu đề cập → "a band".` },

  // Pronouns (1)
  { test_number:3, topic:'Pronouns', q:'Between you and _____, I think our team will win easily.', opts:['I','me','my','mine'], ans:1,
    expl:`<span class="tag">Đại từ</span><strong>Đáp án: me</strong> — Sau giới từ (between) → đại từ tân ngữ "me".` },

  // Possessive Determiners (1)
  { test_number:3, topic:'Possessive Determiners', q:'The players warmed up and checked _____ equipment before the game.', opts:['their','theirs','them','they'], ans:0,
    expl:`<span class="tag">Tính từ sở hữu</span><strong>Đáp án: their</strong> — Trước danh từ (equipment) → tính từ sở hữu "their".` },

  // Relative Clauses (1)
  { test_number:3, topic:'Relative Clauses', q:'The athlete _____ broke the world record is only nineteen years old.', opts:['who','which','whose','whom'], ans:0,
    expl:`<span class="tag">Mệnh đề quan hệ</span><strong>Đáp án: who</strong> — Người làm chủ ngữ trong mệnh đề quan hệ → "who".` },

  // Reduced Relative Clauses (1)
  { test_number:3, topic:'Reduced Relative Clauses', q:'The athlete _____ in the final will compete for the gold medal.', opts:['ran','running','who running','runs'], ans:1,
    expl:`<span class="tag">Mệnh đề quan hệ rút gọn</span><strong>Đáp án: running</strong> — "Who is running" rút gọn → V-ing.` },

  // Modals (2)
  { test_number:3, topic:'Modal Verbs', q:'You _____ stretch before exercise to avoid injury.', opts:['must','should','will','would'], ans:1,
    expl:`<span class="tag">Lời khuyên</span><strong>Đáp án: should</strong> — Lời khuyên → "should".` },
  { test_number:3, topic:'Modal Verbs', q:'He _____ lift 100 kg when he was at his peak — he was incredibly strong.', opts:['can','could','should','must'], ans:1,
    expl:`<span class="tag">Khả năng quá khứ</span><strong>Đáp án: could</strong> — Khả năng trong quá khứ → "could".` },

  // Modal Perfect (1)
  { test_number:3, topic:'Modal Perfect', q:"She _____ harder — she came second, but first was possible.", opts:['should train','should have trained','must train','might train'], ans:1,
    expl:`<span class="tag">Modal perfect</span><strong>Đáp án: should have trained</strong> — Tiếc nuối về quá khứ: should have + V3.` },

  // Questions (1)
  { test_number:3, topic:'Questions', q:'_____ sport do you enjoy most — team sports or individual ones?', opts:['What','Which','How','Who'], ans:1,
    expl:`<span class="tag">Câu hỏi</span><strong>Đáp án: Which</strong> — Chọn trong nhóm giới hạn → "Which".` },

  // Question Tags (1)
  { test_number:3, topic:'Question Tags', q:"That was an amazing match, _____ ?", opts:["wasn't it","isn't it","was it","is it"], ans:0,
    expl:`<span class="tag">Câu hỏi đuôi</span><strong>Đáp án: wasn't it</strong> — Mệnh đề khẳng định (was) → đuôi phủ định: wasn't it.` },

  // Indirect Questions (1)
  { test_number:3, topic:'Indirect Questions', q:'Can you tell me _____ the sports centre opens on Sundays?', opts:['when','what time','if','how'], ans:2,
    expl:`<span class="tag">Câu hỏi gián tiếp</span><strong>Đáp án: if</strong> — Yes/No question gián tiếp → "if/whether + S + V".` },

  // So and Such (1)
  { test_number:3, topic:'So and Such', q:'He runs _____ fast that no one can keep up with him.', opts:['so','such','too','very'], ans:0,
    expl:`<span class="tag">So</span><strong>Đáp án: so</strong> — "So" + trạng từ + that. "Such" dùng trước (a/an +) danh từ.` },

  // Too and Enough (1)
  { test_number:3, topic:'Too and Enough', q:'He is fit _____ to run a marathon without any problems.', opts:['too','enough','so','very'], ans:1,
    expl:`<span class="tag">Enough</span><strong>Đáp án: enough</strong> — "Adj + enough + to-V" = đủ ... để làm gì.` },

  // Comparatives (1)
  { test_number:3, topic:'Comparatives', q:'Swimming is _____ for your joints than running on hard ground.', opts:['more good','better','best','the best'], ans:1,
    expl:`<span class="tag">So sánh hơn</span><strong>Đáp án: better</strong> — Bất quy tắc: good → better (+ than).` },

  // Superlatives (1)
  { test_number:3, topic:'Superlatives', q:'She is _____ swimmer in the whole school.', opts:['the fastest','the more fast','a fastest','faster'], ans:0,
    expl:`<span class="tag">So sánh nhất</span><strong>Đáp án: the fastest</strong> — Tính từ ngắn (fast) → the + -est.` },

  // Zero Conditional (1)
  { test_number:3, topic:'Conditionals', q:'If you _____ regularly, your fitness improves naturally.', opts:['exercise','exercised','will exercise','would exercise'], ans:0,
    expl:`<span class="tag">Điều kiện loại 0</span><strong>Đáp án: exercise</strong> — Sự thật tổng quát → hiện tại đơn ở cả hai mệnh đề.` },

  // First Conditional (1)
  { test_number:3, topic:'Conditionals', q:'If she _____ every day this week, she will be ready for the race.', opts:['trains','trained','will train','would train'], ans:0,
    expl:`<span class="tag">Điều kiện loại 1</span><strong>Đáp án: trains</strong> — Có thể xảy ra: If + hiện tại đơn, will + V.` },

  // Second Conditional (1)
  { test_number:3, topic:'Conditionals', q:'If I _____ faster, I would join the athletics team.', opts:['run','ran','would run','have run'], ans:1,
    expl:`<span class="tag">Điều kiện loại 2</span><strong>Đáp án: ran</strong> — Giả định không thật ở hiện tại: If + V quá khứ, would + V.` },

  // Third Conditional (1)
  { test_number:3, topic:'Conditionals', q:'If he _____ the warm-up, he might not have pulled a muscle.', opts:['did','had done','would do','does'], ans:1,
    expl:`<span class="tag">Điều kiện loại 3</span><strong>Đáp án: had done</strong> — Không thật ở quá khứ: If + had + V3, might/would have + V3.` },

  // Mixed Conditional (1)
  { test_number:3, topic:'Conditionals', q:'If she _____ her ankle last year, she would be competing now.', opts:["didn't break",'had not broken','would not break','has not broken'], ans:1,
    expl:`<span class="tag">Điều kiện hỗn hợp</span><strong>Đáp án: had not broken</strong> — Nguyên nhân quá khứ → kết quả hiện tại.` },

  // Inverted Conditionals (1)
  { test_number:3, topic:'Inverted Conditionals', q:'_____ he to train harder, he could qualify for the national team.', opts:['Were','Should','Had','Did'], ans:0,
    expl:`<span class="tag">Đảo ngữ điều kiện</span><strong>Đáp án: Were</strong> — Đảo ngữ loại 2: Were + S + to + V (= If he were to train...).` },

  // Unless / In case / As long as (1)
  { test_number:3, topic:'Unless / In case / As long as', q:'She will not compete _____ her coach gives her permission.', opts:['unless','in case','as long as','although'], ans:0,
    expl:`<span class="tag">Unless</span><strong>Đáp án: unless</strong> — "Unless" = if not / trừ khi.` },

  // Reported Speech (1)
  { test_number:3, topic:'Reported Speech', q:'"I have broken the record," she announced. → She announced that she _____ the record.', opts:['has broken','broke','had broken','breaks'], ans:2,
    expl:`<span class="tag">Câu tường thuật</span><strong>Đáp án: had broken</strong> — Lùi thì: have broken → had broken.` },

  // Reported Questions (1)
  { test_number:3, topic:'Reported Questions', q:'"How long have you been training?" → The journalist asked how long she _____ training.', opts:['has been','had been','was','is'], ans:1,
    expl:`<span class="tag">Câu hỏi tường thuật</span><strong>Đáp án: had been</strong> — Lùi thì: has been → had been.` },

  // Reporting Verbs (1)
  { test_number:3, topic:'Reporting Verbs', q:'The coach _____ the players to get more sleep before the match.', opts:['advised','suggested','mentioned','said'], ans:0,
    expl:`<span class="tag">Động từ tường thuật</span><strong>Đáp án: advised</strong> — "Advise + O + to-V" = khuyên ai làm gì.` },

  // Direct & Indirect Objects (1)
  { test_number:3, topic:'Direct and Indirect Objects', q:'The club offered _____ a one-year contract after the tournament.', opts:['to him','him','for him','he'], ans:1,
    expl:`<span class="tag">Tân ngữ</span><strong>Đáp án: him</strong> — "Offer + IO + DO": offer him a contract. IO đứng trước.` },

  // Wish (1)
  { test_number:3, topic:'Wish', q:'I wish I _____ harder last season. I missed the finals.', opts:['trained','had trained','would train','have trained'], ans:1,
    expl:`<span class="tag">Wish</span><strong>Đáp án: had trained</strong> — Tiếc nuối về quá khứ: wish + had + V3.` },

  // Unreal Past (1)
  { test_number:3, topic:'Unreal Past', q:'If only I _____ that injury during the championship last month.', opts:["don't have",'had not had',"didn't have",'have not had'], ans:1,
    expl:`<span class="tag">If only – quá khứ</span><strong>Đáp án: had not had</strong> — "If only + had + V3" = giá như đã không ... (tiếc nuối quá khứ).` },

  // Contrast Structures (1)
  { test_number:3, topic:'Contrast Structures', q:'He scored the winning goal _____ playing with a slight injury.', opts:['despite','although','however','even though'], ans:0,
    expl:`<span class="tag">Cấu trúc đối lập</span><strong>Đáp án: despite</strong> — "Despite" + danh từ/V-ing. "Although/Even though" + mệnh đề.` },

  // -ing / Infinitive (1)
  { test_number:3, topic:'-ing Form and Infinitive', q:'She managed _____ a gold medal at her first Olympic Games.', opts:['winning','to win','win','having won'], ans:1,
    expl:`<span class="tag">Infinitive</span><strong>Đáp án: to win</strong> — "Manage" → to-infinitive: manage to + V.` },

  // Verb patterns – meaning change (1)
  { test_number:3, topic:'Verb Patterns (meaning change)', q:'He stopped _____ to catch his breath during the race.', opts:['running','to run','run','ran'], ans:1,
    expl:`<span class="tag">Nghĩa thay đổi</span><strong>Đáp án: to run</strong> — "Stop to-V" = dừng lại ĐỂ làm việc khác. "Stop V-ing" = dừng hành động đó.` },

  // Verb Patterns (1)
  { test_number:3, topic:'Verb Patterns', q:'The coach encouraged the team _____ their best in every game.', opts:['give','giving','to give','given'], ans:2,
    expl:`<span class="tag">Verb patterns</span><strong>Đáp án: to give</strong> — "Encourage + O + to-V" = khuyến khích ai làm gì.` },

  // Both / Either / Neither (1)
  { test_number:3, topic:'Both / Either / Neither / So / Nor', q:'_____ team played well — the game ended in a 0-0 draw.', opts:['Neither','Either','Both','None'], ans:0,
    expl:`<span class="tag">Neither</span><strong>Đáp án: Neither</strong> — "Neither team played well" = không đội nào chơi tốt.` },

  // Connectives (1)
  { test_number:3, topic:'Connectives', q:'He trained hard all year. _____, he failed to qualify for the final.', opts:['Nevertheless','Therefore','Moreover','As a result'], ans:0,
    expl:`<span class="tag">Connectives</span><strong>Đáp án: Nevertheless</strong> — Bất chấp nỗ lực, kết quả không như mong muốn → "Nevertheless" (mặc dù vậy).` },

  // Causative (1)
  { test_number:3, topic:'Causative', q:'The club got the stadium _____ before the new season.', opts:['renovating','renovated','to renovate','renovate'], ans:1,
    expl:`<span class="tag">Causative</span><strong>Đáp án: renovated</strong> — "Get + O + V3" = nhờ người khác làm gì (= have + O + V3).` },

  // Prefer / Would Rather / Had Better (1)
  { test_number:3, topic:'Prefer / Would Rather / Had Better', q:'You _____ warm up properly, or you could injure yourself.', opts:['had better','would rather','prefer','used to'], ans:0,
    expl:`<span class="tag">Had better</span><strong>Đáp án: had better</strong> — Lời khuyên mạnh với hàm ý cảnh báo hậu quả → had better + V.` },

  // Infinitives of Purpose (1)
  { test_number:3, topic:'Infinitives of Purpose', q:'She wakes up at 5 am every morning _____ before work.', opts:['to train','for training','for train','training'], ans:0,
    expl:`<span class="tag">Infinitive mục đích</span><strong>Đáp án: to train</strong> — "To + V" diễn tả mục đích.` },

  // Participles (1)
  { test_number:3, topic:'Participles', q:'_____ the finish line, the runner raised her arms in victory.', opts:['Cross','Crossed','Crossing','To cross'], ans:2,
    expl:`<span class="tag">Phân từ</span><strong>Đáp án: Crossing</strong> — Phân từ hiện tại (V-ing) làm trạng ngữ, đồng thời với hành động chính.` },

  // Inversions (1)
  { test_number:3, topic:'Inversions', q:'Rarely _____ such determination in an athlete so young.', opts:['you see','do you see','you do see','seen you'], ans:1,
    expl:`<span class="tag">Đảo ngữ</span><strong>Đáp án: do you see</strong> — "Rarely" đứng đầu câu → đảo ngữ: Rarely + do/does + S + V.` },

  // Possessives (1)
  { test_number:3, topic:'Possessives', q:"The gold medal wasn't his. It was _____.", opts:['hers',"her's",'her',"she's"], ans:0,
    expl:`<span class="tag">Đại từ sở hữu</span><strong>Đáp án: hers</strong> — Đại từ sở hữu đứng một mình → "hers" (không có dấu nháy).` },

  // Quantifiers (1)
  { test_number:3, topic:'Quantifiers', q:'She drinks _____ water during training — at least three litres a day.', opts:['a lot of','many','few','little'], ans:0,
    expl:`<span class="tag">Lượng từ</span><strong>Đáp án: a lot of</strong> — "A lot of" dùng được với danh từ đếm được và không đếm được. "Water" không đếm được.` },

  // Prepositional Phrases (1)
  { test_number:3, topic:'Prepositional Phrases', q:'The match was cancelled _____ account of the heavy rain.', opts:['on','in','at','by'], ans:0,
    expl:`<span class="tag">Cụm giới từ</span><strong>Đáp án: on</strong> — Cố định: "on account of" = vì lý do.` },

  // Word Formation (1)
  { test_number:3, topic:'Word Formation', q:'His _____ (determine) to succeed helped him become a champion.', opts:['determine','determined','determination','determinedly'], ans:2,
    expl:`<span class="tag">Cấu tạo từ</span><strong>Đáp án: determination</strong> — Cần danh từ sau "His": determine + -ation = determination.` },

  // Phrasal Verbs (1)
  { test_number:3, topic:'Phrasal Verbs', q:'After a difficult season, the team is hoping to _____ in the finals.', opts:['come back','come up','come in','come over'], ans:0,
    expl:`<span class="tag">Cụm động từ</span><strong>Đáp án: come back</strong> — "Come back" = trở lại, phục hồi sau giai đoạn khó khăn.` },

  // Collocations (1)
  { test_number:3, topic:'Collocations', q:'The coach told the players to _____ their best in every game.', opts:['do','make','give','take'], ans:2,
    expl:`<span class="tag">Collocations</span><strong>Đáp án: give</strong> — Cố định: "give your best" = cống hiến hết sức.` },
]

async function main() {
  const batchSize = 20
  for (let i = 0; i < QUESTIONS.length; i += batchSize) {
    const batch = QUESTIONS.slice(i, i + batchSize)
    const { error } = await supabase.from('questions').insert(batch)
    if (error) { console.error(`Batch ${Math.floor(i/batchSize)+1} error:`, error.message); process.exit(1) }
    console.log(`Batch ${Math.floor(i/batchSize)+1} inserted (${batch.length} questions)`)
  }
  console.log(`Done! ${QUESTIONS.length} questions inserted for Test 3.`)
}

main()
