import type { Question } from '@/types/quiz';

export const QS: Omit<Question, 'id'>[] = [
  {
    q: 'Choose the grammatically correct sentence:',
    opts: [
      'She don\'t like coffee.',
      'She doesn\'t like coffee.',
      'She didn\'t likes coffee.',
      'She not like coffee.',
    ],
    ans: 1,
    topic: 'Present Simple',
    expl: `<span class="tag">Thì hiện tại đơn</span>
<strong>Đáp án đúng: "She doesn't like coffee."</strong><br><br>
Trong thì hiện tại đơn (Present Simple), với chủ ngữ ngôi thứ 3 số ít (he / she / it), câu phủ định bắt buộc dùng <strong>doesn't</strong> (does + not), không dùng "don't".<br><br>
<strong>Cấu trúc:</strong> He / She / It + <strong>doesn't</strong> + V (nguyên thể)<br>
I / You / We / They + don't + V<br><br>
Ví dụ: He <strong>doesn't</strong> eat meat. / They <strong>don't</strong> work here.`,
  },
  {
    q: '_____ you speak any foreign language?',
    opts: ['Do', 'Can', 'Are', 'Have'],
    ans: 1,
    topic: 'Modal Verbs',
    expl: `<span class="tag">Động từ khiếm khuyết</span>
<strong>Đáp án đúng: "Can you speak any foreign language?"</strong><br><br>
<strong>"Can"</strong> là động từ khiếm khuyết (modal verb) dùng để hỏi về <strong>khả năng</strong>. "Do" hỏi thói quen, "Are" dùng với thì tiếp diễn, "Have" dùng với thì hoàn thành.<br><br>
<strong>Cấu trúc:</strong> Can + S + V (nguyên thể)?<br>
Ví dụ: Can she drive? / Can they swim?`,
  },
  {
    q: 'She _____ to school every day when she was young.',
    opts: ['walks', 'is walking', 'walked', 'has walked'],
    ans: 2,
    topic: 'Past Simple',
    expl: `<span class="tag">Thì quá khứ đơn</span>
<strong>Đáp án đúng: "She walked to school every day when she was young."</strong><br><br>
Dấu hiệu <strong>"when she was young"</strong> cho biết đây là thói quen đã kết thúc trong quá khứ → dùng thì quá khứ đơn (Past Simple).<br><br>
<strong>Cấu trúc:</strong> S + V-ed / V2<br>
"walks" (hiện tại đơn) và "has walked" (hiện tại hoàn thành) đều sai khi có mốc thời gian trong quá khứ.`,
  },
  {
    q: 'By the time she arrived at the party, everyone _____ home.',
    opts: ['went', 'has gone', 'had gone', 'was going'],
    ans: 2,
    topic: 'Past Perfect',
    expl: `<span class="tag">Thì quá khứ hoàn thành</span>
<strong>Đáp án đúng: "everyone had gone home."</strong><br><br>
Thì quá khứ hoàn thành (<strong>had + V3</strong>) diễn tả hành động xảy ra <strong>trước</strong> một hành động khác trong quá khứ. Mọi người về nhà TRƯỚC khi cô ấy đến.<br><br>
<strong>Quy tắc:</strong> By the time + quá khứ đơn → mệnh đề chính dùng quá khứ hoàn thành.<br>
Ví dụ: By the time I called, she <strong>had left</strong>.`,
  },
  {
    q: 'If I _____ you, I would apologize immediately.',
    opts: ['am', 'was', 'were', 'had been'],
    ans: 2,
    topic: 'Conditionals',
    expl: `<span class="tag">Câu điều kiện loại 2</span>
<strong>Đáp án đúng: "If I were you, I would apologize immediately."</strong><br><br>
Câu điều kiện loại 2 giả định điều không có thật ở hiện tại. Trong mệnh đề If dùng <strong>"were"</strong> cho tất cả các ngôi trong văn chuẩn.<br><br>
<strong>Cấu trúc:</strong> If + S + <strong>were</strong> ..., S + would + V<br>
Lưu ý: "was" gặp trong khẩu ngữ nhưng "were" là chuẩn ngữ pháp trang trọng.`,
  },
  {
    q: 'She suggested _____ to the new Italian restaurant downtown.',
    opts: ['to go', 'go', 'going', 'gone'],
    ans: 2,
    topic: 'Gerunds',
    expl: `<span class="tag">Danh động từ (Gerund)</span>
<strong>Đáp án đúng: "She suggested going to the new Italian restaurant."</strong><br><br>
Sau động từ <strong>"suggest"</strong>, bắt buộc dùng <strong>V-ing</strong> (gerund), không dùng to-infinitive.<br><br>
<strong>Các động từ tương tự + V-ing:</strong><br>
enjoy, avoid, mind, consider, finish, recommend, admit, deny, keep, practice...<br>
Ví dụ: He suggested <strong>taking</strong> a taxi. / She avoided <strong>talking</strong> to him.`,
  },
  {
    q: 'Neither the manager nor the employees _____ informed about the change.',
    opts: ['was', 'were', 'has been', 'is'],
    ans: 1,
    topic: 'Subject-Verb Agreement',
    expl: `<span class="tag">Chia động từ – Neither...nor</span>
<strong>Đáp án đúng: "Neither the manager nor the employees were informed."</strong><br><br>
Với cấu trúc <strong>Neither...nor...</strong>, động từ chia theo danh từ <strong>gần nhất</strong> (quy tắc "proximity"). Ở đây "the employees" (số nhiều) → dùng "were".<br><br>
<strong>So sánh:</strong> "Neither the employees nor the manager <strong>was</strong> informed." (manager số ít → was)<br>
Tương tự: Either...or, Not only...but also`,
  },
  {
    q: 'The annual report must _____ to the board by next Friday.',
    opts: ['submit', 'be submitted', 'submitted', 'submitting'],
    ans: 1,
    topic: 'Passive Voice',
    expl: `<span class="tag">Câu bị động – Modal</span>
<strong>Đáp án đúng: "The annual report must be submitted to the board."</strong><br><br>
Câu bị động với động từ khiếm khuyết: <strong>modal + be + V3</strong>.<br><br>
<strong>Cấu trúc:</strong> S + modal + <strong>be</strong> + V3<br>
Ví dụ: The project must <strong>be completed</strong>. / The form should <strong>be filled</strong> out.`,
  },
  {
    q: 'I _____ this city before, so I know my way around perfectly.',
    opts: ['visited', 'had visited', 'have visited', 'was visiting'],
    ans: 2,
    topic: 'Present Perfect',
    expl: `<span class="tag">Thì hiện tại hoàn thành</span>
<strong>Đáp án đúng: "I have visited this city before."</strong><br><br>
Thì hiện tại hoàn thành (<strong>have/has + V3</strong>) diễn tả kinh nghiệm từ trước đến nay, không xác định thời điểm cụ thể. Từ <strong>"before"</strong> là dấu hiệu đặc trưng.<br><br>
<strong>Phân biệt:</strong> "I visited this city <strong>last year</strong>" (thời điểm xác định → quá khứ đơn)<br>
<strong>Trạng từ thường gặp:</strong> ever, never, already, yet, recently, before, so far`,
  },
  {
    q: 'The students, along with their teacher, _____ excited about the upcoming trip.',
    opts: ['are', 'is', 'were being', 'has been'],
    ans: 0,
    topic: 'Subject-Verb Agreement',
    expl: `<span class="tag">Chia động từ – Along with</span>
<strong>Đáp án đúng: "The students, along with their teacher, are excited."</strong><br><br>
Cụm <strong>"along with"</strong> là giới từ bổ sung, không phải liên từ nối chủ ngữ. Chủ ngữ thực sự vẫn là <strong>"The students"</strong> (số nhiều) → động từ số nhiều: <strong>"are"</strong>.<br><br>
<strong>Tương tự:</strong> together with, as well as, in addition to, accompanied by<br>
Ví dụ: The teacher, along with the students, <strong>is</strong> waiting. (teacher = số ít → is)`,
  },
];
