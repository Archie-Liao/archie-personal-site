interface VideoPlayerProps {
  bvid: string;
  title: string;
}

export function VideoPlayer({ bvid, title }: VideoPlayerProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ background: "#000", aspectRatio: "16/9" }}>
      <iframe
        src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`}
        title={title}
        allowFullScreen
        scrolling="no"
        frameBorder="0"
        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        className="w-full h-full"
        style={{ border: "none" }}
      />
    </div>
  );
}
