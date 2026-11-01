const profiles = [
  {name:'林墨', city:'杭州 · 线上可约', avatar:'林', color:'#beddf7', teach:'Python 入门', learn:'手机摄影', score:98, availability:'今晚 20:00 后'},
  {name:'Mia', city:'上海 · 可线下见面', avatar:'M', color:'#ffd0bd', teach:'英语口语', learn:'视频剪辑', score:95, availability:'周末有空'},
  {name:'周野', city:'北京 · 线上可约', avatar:'周', color:'#f8df83', teach:'街舞基础', learn:'产品设计', score:93, availability:'工作日晚上'},
  {name:'阿布', city:'广州 · 可线下见面', avatar:'阿', color:'#c8edcf', teach:'吉他入门', learn:'日语会话', score:91, availability:'周六下午'},
  {name:'小满', city:'上海 · 线上可约', avatar:'满', color:'#e2cbf5', teach:'手机摄影', learn:'手冲咖啡', score:89, availability:'时间灵活'},
  {name:'Echo', city:'深圳 · 线上可约', avatar:'E', color:'#c9e6df', teach:'视频剪辑', learn:'尤克里里', score:87, availability:'周日全天'}
];
const grid = document.querySelector('#profile-grid');
const search = document.querySelector('#skill-search');
const title = document.querySelector('#result-title');
const count = document.querySelector('#result-count');
const toast = document.querySelector('#toast');

function renderProfiles(list = profiles) {
  count.textContent = `共 ${list.length} 位`;
  grid.innerHTML = list.length ? list.map((p) => `
    <article class="profile-card">
      <div class="profile-head">
        <span class="profile-avatar" style="background:${p.color}">${p.avatar}</span>
        <span><strong class="profile-name">${p.name}</strong><small class="profile-meta">${p.city}</small></span>
        <span class="match-score">${p.score}% 匹配</span>
      </div>
      <div class="skills"><span class="skill">能教 · ${p.teach}</span><span class="skill learn">想学 · ${p.learn}</span></div>
      <div class="profile-footer"><span class="location">● ${p.availability}</span><button class="connect" data-name="${p.name}">发起交换&nbsp; →</button></div>
    </article>
  `).join('') : '<div class="empty-state">还没有找到完全匹配的伙伴，试试更宽泛的关键词吧。</div>';
}
function doSearch(value = search.value) {
  const query = value.trim().toLowerCase();
  const result = query ? profiles.filter((p) => `${p.teach}${p.learn}${p.city}`.toLowerCase().includes(query)) : profiles;
  title.textContent = query ? `“${value.trim()}”的匹配伙伴` : '为你推荐的伙伴';
  renderProfiles(result);
}
document.querySelector('#search-btn').addEventListener('click', () => doSearch());
search.addEventListener('keydown', (event) => { if (event.key === 'Enter') doSearch(); });
document.querySelectorAll('[data-tag]').forEach((tag) => tag.addEventListener('click', () => { search.value = tag.dataset.tag; doSearch(tag.dataset.tag); }));
document.querySelector('#sort-select').addEventListener('change', (event) => {
  const list = [...profiles];
  if (event.target.value === 'near') list.reverse();
  renderProfiles(list);
});
document.addEventListener('click', (event) => {
  const button = event.target.closest('.connect');
  if (button) showToast(`已向 ${button.dataset.name} 发出交换请求 ✦`);
});
function showToast(message) { toast.textContent = message; toast.classList.add('show'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600); }
const modal = document.querySelector('#post-modal');
document.querySelectorAll('[data-open-post]').forEach((button) => button.addEventListener('click', () => { modal.hidden = false; modal.querySelector('input').focus(); }));
document.querySelector('[data-close-post]').addEventListener('click', () => { modal.hidden = true; });
modal.addEventListener('click', (event) => { if (event.target === modal) modal.hidden = true; });
document.querySelector('#post-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  modal.hidden = true;
  event.target.reset();
  showToast(`${data.get('name')}，你的技能名片已发布！`);
});
renderProfiles();
