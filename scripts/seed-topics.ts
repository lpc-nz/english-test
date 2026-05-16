import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

const TOPICS = [
  {
    name: 'Present Simple',
    theory_html: `<strong>Cấu trúc</strong><br>
(+) S + V / V-s/es &nbsp;—&nbsp; <em>She works every day.</em><br>
(–) S + don't / doesn't + V &nbsp;—&nbsp; <em>He doesn't smoke.</em><br>
(?) Do / Does + S + V? &nbsp;—&nbsp; <em>Do they speak English?</em><br><br>
<strong>Quy tắc thêm -s/-es (he / she / it)</strong><br>
• Thêm <strong>-s</strong> vào đa số động từ: work → <em>works</em>, play → <em>plays</em><br>
• Thêm <strong>-es</strong> khi kết thúc bằng -o, -s, -x, -z, -ch, -sh: go → <em>goes</em>, watch → <em>watches</em><br>
• Phụ âm + y → <strong>-ies</strong>: study → <em>studies</em>, fly → <em>flies</em><br><br>
<strong>Cách dùng</strong><br>
1. Thói quen, hành động lặp lại: <em>"She drinks coffee every morning."</em><br>
2. Sự thật hiển nhiên, quy luật tự nhiên: <em>"Water boils at 100°C."</em><br>
3. Lịch trình, thời gian biểu cố định: <em>"The train leaves at 8 AM."</em><br><br>
<strong>Trạng từ tần suất</strong><br>
always → usually → often → sometimes → rarely → never<br>
Vị trí: sau động từ <em>be</em>, trước động từ thường.`,
  },
  {
    name: 'Past Simple',
    theory_html: `<strong>Cấu trúc</strong><br>
(+) S + V-ed / V2 &nbsp;—&nbsp; <em>She walked to school.</em><br>
(–) S + didn't + V &nbsp;—&nbsp; <em>He didn't call me.</em><br>
(?) Did + S + V? &nbsp;—&nbsp; <em>Did they arrive on time?</em><br><br>
<strong>Quy tắc thêm -ed</strong><br>
• Đa số: thêm <strong>-ed</strong>: walk → <em>walked</em>, play → <em>played</em><br>
• Kết thúc bằng -e: thêm <strong>-d</strong>: like → <em>liked</em><br>
• Phụ âm + y → <strong>-ied</strong>: study → <em>studied</em><br>
• Kết thúc CVC (nguyên âm đơn + phụ âm): nhân đôi phụ âm cuối + <strong>-ed</strong>: stop → <em>stopped</em><br><br>
<strong>Cách dùng</strong><br>
1. Hành động đã xảy ra và kết thúc ở một thời điểm xác định trong quá khứ:<br>
&nbsp;&nbsp;&nbsp;<em>"I visited Paris last summer."</em><br>
2. Thói quen trong quá khứ (nay không còn): <em>"She walked to school every day when she was young."</em><br><br>
<strong>Dấu hiệu nhận biết</strong><br>
yesterday, last night/week/month/year, ago, in + năm quá khứ, when + mệnh đề quá khứ.`,
  },
  {
    name: 'Past Perfect',
    theory_html: `<strong>Cấu trúc</strong><br>
(+) S + <strong>had</strong> + V3/V-ed &nbsp;—&nbsp; <em>She had left before I arrived.</em><br>
(–) S + <strong>hadn't</strong> + V3/V-ed &nbsp;—&nbsp; <em>He hadn't eaten yet.</em><br>
(?) <strong>Had</strong> + S + V3/V-ed? &nbsp;—&nbsp; <em>Had they met before?</em><br><br>
<strong>Cách dùng</strong><br>
Diễn tả hành động xảy ra và hoàn thành <strong>trước</strong> một hành động khác trong quá khứ.<br><br>
<em>"By the time she arrived at the party, everyone <strong>had gone</strong> home."</em><br>
→ Mọi người về <strong>trước</strong> khi cô ấy đến.<br><br>
<strong>Cặp từ nối thường gặp</strong><br>
• <strong>By the time + quá khứ đơn</strong> → mệnh đề chính dùng quá khứ hoàn thành<br>
• <strong>After</strong> S + past perfect, S + past simple<br>
• <strong>Before / When</strong> + past simple, S + past perfect<br><br>
<strong>Phân biệt với quá khứ đơn</strong><br>
• Quá khứ đơn: hai hành động liên tiếp không cần nhấn mạnh thứ tự.<br>
• Quá khứ hoàn thành: nhấn mạnh hành động <strong>trước</strong> đã hoàn thành trước khi hành động <strong>sau</strong> xảy ra.`,
  },
  {
    name: 'Present Perfect',
    theory_html: `<strong>Cấu trúc</strong><br>
(+) S + <strong>have / has</strong> + V3/V-ed &nbsp;—&nbsp; <em>I have visited this city before.</em><br>
(–) S + <strong>haven't / hasn't</strong> + V3/V-ed<br>
(?) <strong>Have / Has</strong> + S + V3/V-ed?<br><br>
<em>have</em> dùng với: I, you, we, they &nbsp;|&nbsp; <em>has</em> dùng với: he, she, it<br><br>
<strong>Cách dùng</strong><br>
1. Kinh nghiệm chưa xác định thời điểm: <em>"I have been to Japan."</em><br>
2. Hành động vừa xảy ra gần đây: <em>"She has just finished her homework."</em><br>
3. Hành động bắt đầu trong quá khứ, còn kéo dài đến hiện tại: <em>"He has lived here for 10 years."</em><br>
4. Hành động quá khứ có kết quả ở hiện tại: <em>"I have lost my keys."</em> (→ vẫn chưa tìm được)<br><br>
<strong>Trạng từ thường gặp</strong><br>
<em>ever, never, already, yet, just, recently, before, so far, since, for</em><br><br>
<strong>Phân biệt với quá khứ đơn</strong><br>
Có thời điểm cụ thể → quá khứ đơn: <em>"I visited Paris <strong>last year</strong>."</em><br>
Không có thời điểm cụ thể → hiện tại hoàn thành: <em>"I <strong>have visited</strong> Paris."</em>`,
  },
  {
    name: 'Conditionals',
    theory_html: `<strong>Câu điều kiện loại 1 — Có thể xảy ra ở hiện tại/tương lai</strong><br>
If + S + <strong>V (hiện tại đơn)</strong>, S + <strong>will/can/may + V</strong><br>
<em>"If it rains, I will stay home."</em><br><br>
<strong>Câu điều kiện loại 2 — Giả định không có thật ở hiện tại</strong><br>
If + S + <strong>V-ed / were</strong>, S + <strong>would/could/might + V</strong><br>
<em>"If I were you, I would apologize immediately."</em><br>
⚠️ Dùng <strong>were</strong> cho tất cả các ngôi trong văn chuẩn (kể cả I/he/she).<br><br>
<strong>Câu điều kiện loại 3 — Giả định không có thật ở quá khứ</strong><br>
If + S + <strong>had + V3/V-ed</strong>, S + <strong>would/could/might + have + V3/V-ed</strong><br>
<em>"If she had studied harder, she would have passed the exam."</em><br><br>
<strong>Mixed Conditional — Điều kiện pha trộn</strong><br>
If + S + had + V3 (quá khứ), S + would + V (hiện tại)<br>
<em>"If I had taken that job, I would be rich now."</em><br><br>
<strong>Cụm từ thay thế If</strong><br>
Unless (= if … not), As long as, Provided that, Supposing that`,
  },
  {
    name: 'Modal Verbs',
    theory_html: `<strong>Đặc điểm của động từ khiếm khuyết</strong><br>
• Không thêm -s/-es ở ngôi 3 số ít<br>
• Theo sau là động từ nguyên thể <strong>không có "to"</strong><br>
• Dùng trực tiếp để đảo ngữ trong câu hỏi<br><br>
<strong>Các động từ khiếm khuyết và ý nghĩa</strong><br>
<strong>can / could</strong> — khả năng, cho phép: <em>"Can she drive?"</em><br>
<strong>must</strong> — bắt buộc (chủ quan): <em>"You must wear a seatbelt."</em><br>
<strong>have to</strong> — bắt buộc (khách quan, từ quy định bên ngoài): <em>"I have to submit it by Friday."</em><br>
<strong>should / ought to</strong> — lời khuyên: <em>"You should see a doctor."</em><br>
<strong>may / might</strong> — khả năng/dự đoán: <em>"It might rain later."</em><br>
<strong>will / would</strong> — tương lai / giả định lịch sự: <em>"Would you like some coffee?"</em><br>
<strong>shall</strong> — đề nghị/lời chào (ngữ cảnh trang trọng): <em>"Shall we begin?"</em><br><br>
<strong>Modal perfect (modal + have + V3)</strong><br>
<em>"She <strong>must have forgotten</strong> her phone."</em> — suy luận về quá khứ<br>
<em>"You <strong>should have told</strong> me earlier."</em> — tiếc nuối / chỉ trích`,
  },
  {
    name: 'Passive Voice',
    theory_html: `<strong>Cấu trúc chung</strong><br>
S + <strong>be (chia theo thì) + V3/V-ed</strong> + (by + tân ngữ)<br><br>
<strong>Công thức theo thì</strong><br>
• Hiện tại đơn: <em>is/am/are + V3</em> — <em>"Coffee is grown in Vietnam."</em><br>
• Quá khứ đơn: <em>was/were + V3</em> — <em>"The letter was written by her."</em><br>
• Hiện tại hoàn thành: <em>has/have been + V3</em> — <em>"The report has been submitted."</em><br>
• Tương lai: <em>will be + V3</em> — <em>"The project will be completed next month."</em><br>
• Modal: <em>modal + be + V3</em> — <em>"The form must be filled out."</em><br>
• Tiếp diễn: <em>is/was being + V3</em> — <em>"The road is being repaired."</em><br><br>
<strong>Khi nào dùng câu bị động?</strong><br>
1. Không biết / không quan trọng chủ thể hành động<br>
2. Muốn nhấn mạnh tân ngữ (đối tượng bị tác động)<br>
3. Trong văn viết trang trọng, khoa học<br><br>
<strong>Lưu ý</strong><br>
"by + tân ngữ" thường bị lược bỏ nếu không cần thiết.<br>
Động từ <em>get</em> thay thế <em>be</em> trong khẩu ngữ: <em>"She got promoted."</em>`,
  },
  {
    name: 'Gerunds',
    theory_html: `<strong>Danh động từ (Gerund) = V + -ing dùng như danh từ</strong><br><br>
<strong>Các vị trí của Gerund</strong><br>
• Chủ ngữ của câu: <em>"<strong>Swimming</strong> is great exercise."</em><br>
• Tân ngữ của động từ: <em>"She enjoys <strong>reading</strong>."</em><br>
• Sau giới từ: <em>"He is good at <strong>cooking</strong>."</em><br>
• Sau một số cụm từ: <em>it's no use, it's worth, have difficulty, spend time...</em><br><br>
<strong>Động từ theo sau bởi Gerund (V + V-ing)</strong><br>
enjoy, avoid, mind, consider, finish, suggest, recommend, admit, deny, keep, practice, miss, delay, risk, imagine, involve...<br><br>
<strong>Động từ theo sau bởi Infinitive (V + to-V)</strong><br>
want, need, decide, plan, hope, expect, agree, refuse, afford, manage, promise, offer...<br><br>
<strong>Động từ dùng được cả hai (nghĩa thay đổi)</strong><br>
<strong>remember / forget</strong>:<br>
&nbsp;+ V-ing → hành động đã xảy ra: <em>"I remember <strong>locking</strong> the door."</em><br>
&nbsp;+ to-V → hành động cần làm: <em>"Remember <strong>to lock</strong> the door."</em><br><br>
<strong>stop</strong>:<br>
&nbsp;+ V-ing → dừng hành động đó: <em>"He stopped <strong>smoking</strong>."</em><br>
&nbsp;+ to-V → dừng để làm việc khác: <em>"He stopped <strong>to smoke</strong>."</em>`,
  },
  {
    name: 'Subject-Verb Agreement',
    theory_html: `<strong>Quy tắc cơ bản</strong><br>
Chủ ngữ số ít → động từ số ít &nbsp;|&nbsp; Chủ ngữ số nhiều → động từ số nhiều<br><br>
<strong>Các trường hợp đặc biệt</strong><br><br>
<strong>1. Neither…nor / Either…or / Not only…but also</strong><br>
Động từ chia theo danh từ <strong>gần nhất</strong> (quy tắc proximity):<br>
<em>"Neither the manager nor the <strong>employees were</strong> informed."</em><br>
<em>"Either the students or the <strong>teacher is</strong> responsible."</em><br><br>
<strong>2. Along with / Together with / As well as / In addition to</strong><br>
Đây là giới từ bổ sung, KHÔNG phải liên từ → chủ ngữ thực là danh từ <strong>trước</strong>:<br>
<em>"The teacher, along with the students, <strong>is</strong> waiting."</em> (teacher → is)<br><br>
<strong>3. Danh từ tập thể (collective nouns)</strong><br>
Thường dùng động từ số ít: team, class, family, government, committee<br>
<em>"The team <strong>has</strong> won the championship."</em><br><br>
<strong>4. Danh từ đếm được số nhiều</strong><br>
Luôn dùng động từ số nhiều dù trông như số ít:<br>
mathematics, physics, news → <strong>số ít</strong><br>
scissors, trousers, glasses → <strong>số nhiều</strong><br><br>
<strong>5. Each / Every / Anyone / No one</strong><br>
Luôn theo sau bởi động từ số ít:<br>
<em>"Each of the students <strong>has</strong> a different opinion."</em>`,
  },
]

async function seedTopics() {
  const { error } = await supabase.from('topics').upsert(TOPICS, { onConflict: 'name' })
  if (error) {
    console.error('Seed topics failed:', error.message)
    process.exit(1)
  }
  console.log(`Seeded ${TOPICS.length} topics successfully.`)
}

seedTopics()
