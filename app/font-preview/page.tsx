const fontOptions = [
  {
    name: "Serif Archive",
    note: "更像文学档案，适合诗和长文。",
    style: {
      fontFamily: '"Songti SC", "Noto Serif SC", "Source Han Serif SC", "STSong", serif'
    }
  },
  {
    name: "Wenkai Personal",
    note: "更私人，有一点手写感。",
    style: {
      fontFamily: '"LXGW WenKai", "Kaiti SC", "STKaiti", "KaiTi", cursive'
    }
  },
  {
    name: "Clean Sans",
    note: "最克制、最现代，适合档案式页面。",
    style: {
      fontFamily: '"Inter", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    }
  },
  {
    name: "System Quiet",
    note: "接近现在的系统字体，轻、稳、加载最快。",
    style: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif'
    }
  }
];

const poem = [
  "飞越宇宙与它的过往",
  "我的喙和羽毛整合于时间此刻的切片",
  "作为一只伫立枝头的乌鸦",
  "",
  "于是风把黑夜从四面八方吹来",
  "乌压压落满一颗大树",
  "我们各自作为一只伫立枝头的乌鸦"
];

export const metadata = {
  title: "Font Preview"
};

export default function FontPreviewPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs uppercase tracking-wide text-soft">Local preview</p>
        <h1 className="text-4xl font-normal text-ink">Font preview</h1>
        <p className="mt-4 leading-7 text-muted">
          这个页面只用于本地比较字体，不会出现在导航里，也不会改变正式网站字体。
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {fontOptions.map((font) => (
          <section key={font.name} className="border-y border-line py-7" style={font.style}>
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-soft">{font.name}</p>
                <h2 className="text-3xl font-normal leading-tight text-ink">Spish</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{font.note}</p>
              </div>
              <p className="shrink-0 text-xs uppercase tracking-wide text-soft">Works / Notes</p>
            </div>

            <div className="space-y-8">
              <article>
                <p className="mb-4 text-xs uppercase tracking-wide text-soft">2025 / Writing / Poetry</p>
                <h3 className="text-3xl font-normal leading-tight text-ink">鸦</h3>
                <div className="mt-7 whitespace-pre-line text-[1.05rem] leading-8 text-ink">
                  {poem.join("\n")}
                </div>
              </article>

              <article className="border-t border-line pt-6">
                <p className="mb-3 text-xs uppercase tracking-wide text-soft">Apr 29, 2026</p>
                <h3 className="text-2xl font-normal text-ink">我的南京游记</h3>
                <p className="mt-5 leading-8 text-muted">
                  每次想要写点什么，总是不知道该从何说起。于是就从那些遥远的非具象的话语中胡乱摸索着，
                  试着扯出我那亟待言说的线头之一。
                </p>
              </article>

              <div className="divide-y divide-line border-t border-line">
                {["雨", "七月", "皇后大道东"].map((title) => (
                  <div key={title} className="grid gap-2 py-4 md:grid-cols-[5rem_1fr]">
                    <span className="text-sm text-soft">2026</span>
                    <span>
                      <span className="block text-lg text-ink">{title}</span>
                      <span className="mt-1 block text-xs uppercase tracking-wide text-soft">Writing / Poetry</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
