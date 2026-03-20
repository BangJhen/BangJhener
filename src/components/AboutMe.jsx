import { gdgocLinkPreview } from "@/data/portfolio";
import TechIconCloud from "@/components/TechIconCloud";
import { LinkPreview } from "@/components/ui/link-preview";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import ammarRidhoPicture from "../../ammar-ridho-picture.png";

export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-[#0b1120] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-3/5">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-cyan-500"></span>
              About Me
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              I am <span className="font-semibold text-cyan-300">Muhammad Ammar Ridho</span>, a{" "}
              <span className="font-semibold text-cyan-300">Data Science undergraduate at Telkom University (GPA 3.91)</span>{" "}
              focused on building practical AI products, from web scraping pipelines with TypeScript (Puppeteer, Axios) to machine learning systems in forecasting and computer vision; currently I contribute as{" "}
              <span className="rounded-md border border-cyan-700/40 bg-cyan-900/20 px-1.5 py-0.5 font-medium text-cyan-200">Mentor of Data Research</span>{" "}
              and{" "}
              <LinkPreview
                url="https://gdg.community.dev/gdg-on-campus-telkom-university-bandung-indonesia/"
                title="GDG on Campus Telkom University"
                description="Official GDGoC Telkom University page with community programs and events."
                imageSrc={gdgocLinkPreview.src}
                imageAlt="GDG on Campus Telkom University page preview"
                showDetails={false}
                positionMode="anchor"
                previewOffsetY={0}>
                <span className="rounded-md border border-cyan-700/40 bg-cyan-900/20 px-1.5 py-0.5 font-medium text-cyan-200">Mentor & Curriculum Machine Learning</span>
              </LinkPreview>, with key achievements including{" "}
              <span className="font-semibold text-cyan-300">Finalist GEMASTIK XVIII Data Mining</span>.
            </p>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-6 text-gray-200 text-center">Tech Stack</h3>
              <div className="w-full flex justify-center">
                <TechIconCloud />
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex justify-center md:justify-end md:pt-4">
            <PixelatedCanvas
              src={ammarRidhoPicture.src}
              width={320}
              height={460}
              cellSize={3}
              dotScale={0.9}
              shape="square"
              backgroundColor="transparent"
              dropoutStrength={0.28}
              interactive
              distortionStrength={2.8}
              distortionRadius={78}
              distortionMode="swirl"
              followSpeed={0.18}
              jitterStrength={2.6}
              jitterSpeed={3.2}
              sampleAverage
              tintColor="#dbeafe"
              tintStrength={0.08}
              className="rounded-xl border border-cyan-900/40 shadow-[0_0_28px_rgba(34,211,238,0.12)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
