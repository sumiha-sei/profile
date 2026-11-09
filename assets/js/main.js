// 演出だけ。JS がなくても全内容が読める（初期非表示は .js があり、かつ動きを減らす設定でないときだけ CSS 側で行う）。
// スクロール出現：.reveal が画面に入ったら .is-in を付ける。IntersectionObserver は1つだけ。

const targets = document.querySelectorAll('.reveal');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (targets.length) {
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((el) => io.observe(el));
  }
}
