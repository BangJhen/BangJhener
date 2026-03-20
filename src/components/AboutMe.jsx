import { cciIgLinkPreview, gdgocLinkPreview } from "@/data/portfolio";
import TechIconCloud from "@/components/TechIconCloud";
import { LinkPreview } from "@/components/ui/link-preview";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import ammarRidhoPicture from "../../ammar-ridho-picture.png";

export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-[#0b1120] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          <div className="w-full md:w-[55%]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-[1px] bg-cyan-500"></span>
              About Me
            </h2>
            <p className="text-gray-400 leading-relaxed mb-0 text-lg">
              I am <span className="font-semibold text-cyan-300">Muhammad Ammar Ridho</span>, a{" "}
              <span className="font-semibold text-cyan-300">Data Science undergraduate at Telkom University (GPA 3.91)</span>{" "}
              focused on building practical AI products, from web scraping pipelines with TypeScript (Puppeteer, Axios) to machine learning systems in forecasting and computer vision; currently I contribute as{" "}
              <LinkPreview
                url="https://www.instagram.com/cciunitel/"
                title="Central Computer Improvement"
                description="Official Instagram page of CCI Telkom University."
                imageSrc={cciIgLinkPreview.src}
                imageAlt="CCI Instagram page preview"
                showDetails={false}
                positionMode="anchor"
                previewOffsetY={0}>
                <span className="rounded-md border border-cyan-700/40 bg-cyan-900/20 px-1.5 py-0.5 font-medium text-cyan-200">Mentor of Data Research</span>
              </LinkPreview>{" "}
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

            <div className="mt-5">
              <div className="w-full flex justify-center">
                <TechIconCloud />
              </div>
              <div className="mt-5 flex justify-center">
                <span className="inline-flex items-center rounded-full border border-cyan-700/40 bg-cyan-900/20 px-2.5 py-0.5 text-xs font-medium uppercase tracking-[0.12em] text-cyan-200">
                  Tech Stack
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[45%] flex justify-center md:justify-end md:pt-2">
            <PixelatedCanvas
              src={ammarRidhoPicture.src}
              width={420}
              height={700}
              cellSize={3}
              dotScale={.65}
              shape="square"
              backgroundColor="#0b1120"
              dropoutStrength={0}
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
              className="block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
