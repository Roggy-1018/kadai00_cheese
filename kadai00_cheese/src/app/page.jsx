"use client";
import React from "react";

function MainComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    kana: "",
    email: "",
    source: "",
    motivation: [],
    message: "",
  });

  const aboutImages = [
    {
      src: "https://ucarecdn.com/c9b107ee-7872-47d0-a07f-4b587e9366d6/about_01.jpg",
      alt: "チーズ料理",
    },
    {
      src: "https://ucarecdn.com/a68721f1-90b9-4864-98ee-9f606501613c/about_02.jpg",
      alt: "農場風景",
    },
    {
      src: "https://ucarecdn.com/b5f8cbe9-251a-4721-bfab-816872257942/about_03.jpg",
      alt: "チーズ職人",
    },
    {
      src: "https://ucarecdn.com/76382841-e181-4a6a-be29-35507865c9b8/about_04.jpg",
      alt: "チーズピザ",
    },
  ];

  const scrollToSection = useCallback((sectionId) => {
    if (typeof window === "undefined") return;
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80;
      const top = section.offsetTop - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleMotivationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      motivation: checked
        ? [...prev.motivation, value]
        : prev.motivation.filter((item) => item !== value),
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setFormData({
        name: "",
        kana: "",
        email: "",
        source: "",
        motivation: [],
        message: "",
      });
      alert(result.message || "お問い合わせありがとうございます。");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white shadow-md z-50 h-[80px]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://ucarecdn.com/8d9d6710-3771-4dc3-ae22-dbfd8d633fe9/header_logo.png"
                alt="Cheese Academy Tokyo"
                className="h-12"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              {["about", "course", "news", "access", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-sm hover:text-[#ffd700] transition-colors duration-300 ${
                      activeSection === section
                        ? "text-[#ffd700]"
                        : "text-black"
                    }`}
                  >
                    {section.toUpperCase()}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-[80px]">
        <section id="top" className="pt-20 relative h-[600px]">
          <div className="absolute inset-0">
            <img
              src="https://ucarecdn.com/b87a7db7-a38b-41d5-b230-22598edd4d59/mainbg.png"
              alt="チーズとトマトの料理"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="text-white text-center w-full">
              <h1 className="text-4xl md:text-5xl mb-4 font-bold">
                セカイを変えるチーズを作ろう
              </h1>
              <p className="text-xl md:text-2xl">
                チーズ職人養成学校「チーズアカデミーTOKYO」
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-center mb-12 fade-in">ABOUT</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-center mb-8">
                チーズアカデミーは、チーズ職人養成学校です。
                <br />
                チーズの素晴らしさを、自給自足を通じて、できるだけ多くの人に知っていただきたい。
                <br />
                そして、食卓にはいつもチーズがあった、あの頃の当たり前をこの手で取り戻したい。
                <br />
                そんな思いか��、チーズ職人養成学校「チーズアカデミーTOKYO」は歩みを始めています。
                <br />
                <br />
                卒業後、チーズ自給自足のバックアップはもちろんのこと、
                <br />
                チーズ職人への就職・転職もサポートします。
              </p>

              <div className="relative h-[400px] overflow-hidden rounded-lg">
                {aboutImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-1000 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {aboutImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index ? "bg-[#ffd700]" : "bg-white"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden md:grid grid-cols-4 gap-4 mt-8">
                {aboutImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="course" className="py-20 bg-[#f9f9f9]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-center mb-12 fade-in">COURSE</h2>
            <p className="text-center mb-16 fade-in">
              未経験からでもスタートができるよう、カリキュラムは多くの専門家や
              現役チーズ職人のアドバイスのもと、作られました。
            </p>
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-8 fade-in">
                <img
                  src="https://ucarecdn.com/791cedc9-4be3-4131-8564-c38bd775b5cb/course_01.jpg"
                  alt="農場風景"
                  className="w-full md:w-1/2 h-[300px] object-cover rounded-lg"
                />
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl mb-4">
                    本格的な農園を使った実地研修
                  </h3>
                  <p>
                    チーズアカデミーでは、本格的な農園を使った実地研修を
                    行うことができます。プロとして活躍するチーズ職人も
                    使用するような、広大で環境も整った農園を余すところ
                    なく使い、卒業時には本格的なチーズを自分の力で作れる
                    実践力の養成を目指します。
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 fade-in">
                <img
                  src="https://ucarecdn.com/35779f4a-7401-4ecd-9b7b-42b86316e8e1/course_02.jpg"
                  alt="講師"
                  className="w-full md:w-1/2 h-[300px] object-cover rounded-lg"
                />
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl mb-4">必要な知識もしっかりと取得</h3>
                  <p>
                    チーズ作りには、しっかりとした食に関する知識が
                    欠かせません。チーズアカデミーでは、一流講師陣による、
                    チーズ作りに必要ないろはを余すところなく学べます。
                    チーズそのものでなく、栄養学全般を学ぶことも可能
                    ですので、チーズ以外への展開も夢ではないでしょう。
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 fade-in">
                <img
                  src="https://ucarecdn.com/a027b1c9-8627-4d0e-b295-04d807f323e4/course_03.jpg"
                  alt="チーズ作り"
                  className="w-full md:w-1/2 h-[300px] object-cover rounded-lg"
                />
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl mb-4">
                    卒業制作はティスティング審査あり
                  </h3>
                  <p>
                    チーズアカデミーでは最後の2ヶ月間で卒業制作を実施。
                    卒業制作として、チーズ作りを実際に行います。卒業後、
                    一般参加によるティスティング審査があるため、作り手の
                    目線だけでなく、消費者の目線から、卒業制作作品としての
                    チーズを、しっかりと評価いただくことができます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="news" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-center mb-12 fade-in">NEWS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white fade-in group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src="https://ucarecdn.com/6850ff3a-a731-4731-bf32-093cc2da41d1/news_img.jpg"
                    alt="ニュース画像"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-600">2016/11/18</p>
                  <h3 className="text-lg font-semibold mt-2 group-hover:text-[#ffd700] transition-colors duration-300">
                    チーズアカデミー卒業生のコスゲさんによるチーズだけを
                    ふんだんに使用した話題のピザ屋「Kosuge Pizza」が渋谷で
                    オープンしました！
                  </h3>
                </div>
              </div>
              <div className="bg-white fade-in group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src="https://ucarecdn.com/6850ff3a-a731-4731-bf32-093cc2da41d1/news_img.jpg"
                    alt="ニュース画像"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-600">2024/01/15</p>
                  <h3 className="text-lg font-semibold mt-2 group-hover:text-[#ffd700] transition-colors duration-300">
                    新春特別セミナーを開催いたします。
                  </h3>
                </div>
              </div>
              <div className="bg-white fade-in group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-lg overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src="https://ucarecdn.com/6850ff3a-a731-4731-bf32-093cc2da41d1/news_img.jpg"
                    alt="ニュース画像"
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-600">2024/01/10</p>
                  <h3 className="text-lg font-semibold mt-2 group-hover:text-[#ffd700] transition-colors duration-300">
                    新年度の授業スケジュールを公開しました。
                  </h3>
                </div>
              </div>
            </div>
            <div className="text-center mt-12 fade-in">
              <button className="bg-[#ffd700] text-white px-8 py-3 rounded hover:bg-[#ffed4a] transition duration-300">
                More
              </button>
            </div>
          </div>
        </section>

        <section id="access" className="py-20 bg-[#f9f9f9]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-center mb-12 fade-in">Access</h2>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl text-center mb-8 fade-in">会社情報</h3>
              <div className="grid grid-cols-1 gap-8 fade-in">
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7479754683745!2d139.7100!3d35.6500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM5JzI0LjAiTiAxMznCsDQyJzM2LjAiRQ!5e0!3m2!1sen!2sjp!4v1635000000000!5m2!1sen!2sjp"
                    className="w-full h-[400px] mb-12"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="max-w-2xl mx-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="py-4 w-1/3">学校名</td>
                        <td className="py-4">チーズアカデミーTOKYO</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="py-4">事務所所在地</td>
                        <td className="py-4">
                          〒107-0061東京都港区北青山3-5-6 青朋ビル2F
                        </td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="py-4">TEL</td>
                        <td className="py-4">03-5413-5045</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="py-4">FAX</td>
                        <td className="py-4">03-5413-5046</td>
                      </tr>
                      <tr className="border-t border-b border-gray-200">
                        <td className="py-4">MAIL</td>
                        <td className="py-4">dummy@cheeseacademy.tokyo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-center mb-8 fade-in">CONTACT</h2>
            <div className="max-w-2xl mx-auto text-center mb-12 fade-in">
              <h3 className="text-xl mb-8">説明会お申し込み・お問い合わせ</h3>
              <p className="mb-4">
                ぜひ1度、足を運んでみませんか。説明会は随時開催中。
              </p>
              <p className="mb-12">
                その他、お問い合わせもお気軽にどうぞ。お待ちしております。
              </p>
              <p className="text-sm text-gray-600 mb-2">
                ※チーズアカデミーは実際には存在しません。
              </p>
              <p className="text-sm text-gray-600 mb-12">
                間違っても問い合わせしないようお願いいたします。
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto fade-in space-y-8"
            >
              <div>
                <label className="block mb-2">名前</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2">カナ</label>
                <input
                  type="text"
                  name="kana"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={formData.kana}
                  onChange={(e) =>
                    setFormData({ ...formData, kana: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2">メールアドレス</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  チーズアカデミーを知ったきっかけ
                </label>
                <select
                  name="source"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                >
                  <option value="">選択してください</option>
                  <option value="google">google検索</option>
                  <option value="sns">SNS</option>
                  <option value="紹介">紹介</option>
                  <option value="たまたま通りかかった">
                    たまたま通りかかった
                  </option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">志望動機</label>
                <div className="space-y-4">
                  {[
                    { value: "起業", label: "起業をしたい" },
                    { value: "就職", label: "チーズ系企業に就職・転職したい" },
                    {
                      value: "仕事",
                      label: "チーズと関わる仕事をしており、仕事に生かしたい",
                    },
                    { value: "教養", label: "チーズの教養を身につけたい" },
                  ].map(({ value, label }) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        name="motivation"
                        value={value}
                        checked={formData.motivation.includes(value)}
                        onChange={handleMotivationChange}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2">詳細</label>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-[#ffd61a] text-black py-4 rounded hover:bg-[#ffd700] transition duration-300"
                >
                  送信
                </button>
              </div>
            </form>
          </div>
        </section>

        <footer className="bg-[#1a1a1a] text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>copyrights 2016 Cheese Academy Tokyo All RIghts Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

<style jsx global>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%;
  }

  .aspect-h-9 {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }
`}</style>;

export default MainComponent;