import { cciIgLinkPreview, gdgocLinkPreview } from "@/data/portfolio";
import TechIconCloud from "@/components/TechIconCloud";
import { LinkPreview } from "@/components/ui/link-preview";
import AboutPixelatedCanvas from "@/components/about-pixelated-canvas";

export default function AboutMe() {
  return (
    <section id="about" className="bg-[#0b1120] py-16 text-white md:py-20">
      <div className="container mx-auto px-5 md:px-[5%]">
        <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold md:mb-6 md:text-4xl">
          <span className="h-[1px] w-12 bg-cyan-500"></span>
          About Me
        </h2>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
          <div className="order-1 mx-auto w-full max-w-[150px] sm:max-w-[165px] lg:order-2 lg:mx-0 lg:w-[45%] lg:max-w-none lg:pt-2 lg:flex lg:justify-end">
            <AboutPixelatedCanvas className="block w-full" />
          </div>

          <div className="order-2 w-full lg:order-1 lg:w-[55%]">
            <p className="mb-0 text-justify text-[0.8rem] leading-5 text-gray-400 sm:text-[0.85rem] sm:leading-6 lg:text-[1.08rem] lg:leading-relaxed">
              I am <span className="font-semibold text-cyan-300">Muhammad Ammar Ridho</span>, a{" "}
              <span className="font-semibold text-cyan-300">Data Science undergraduate at Telkom University (GPA 3.91)</span>{" "}
              focused on building practical AI products, from web scraping pipelines with TypeScript (Puppeteer, Axios) to machine learning systems in forecasting and computer vision; currently I contribute as{" "}
              <LinkPreview
                url="https://www.instagram.com/cciunitel/"
                title="Central Computer Improvement"
                description="Official Instagram page of CCI Telkom University."
                imageSrc={cciIgLinkPreview}
                imageAlt="CCI Instagram page preview"
                showDetails={false}
                positionMode="anchor"
                previewOffsetY={0}>
                <span className="rounded-md border border-cyan-700/40 bg-cyan-900/20 px-1.5 py-0.5 text-[0.72rem] font-medium text-cyan-200 sm:text-xs lg:px-2 lg:text-sm">Mentor of Data Research</span>
              </LinkPreview>{" "}
              and{" "}
              <LinkPreview
                url="https://gdg.community.dev/gdg-on-campus-telkom-university-bandung-indonesia/"
                title="GDG on Campus Telkom University"
                description="Official GDGoC Telkom University page with community programs and events."
                imageSrc={gdgocLinkPreview}
                imageAlt="GDG on Campus Telkom University page preview"
                showDetails={false}
                positionMode="anchor"
                previewOffsetY={0}>
                <span className="rounded-md border border-cyan-700/40 bg-cyan-900/20 px-1.5 py-0.5 text-[0.72rem] font-medium text-cyan-200 sm:text-xs lg:px-2 lg:text-sm">Mentor & Curriculum Machine Learning</span>
              </LinkPreview>, with key achievements including{" "}
              <span className="font-semibold text-cyan-300">Finalist GEMASTIK XVIII Data Mining</span>.
            </p>

            <div className="mt-4 lg:mt-5">
              <div className="flex w-full justify-center">
                <TechIconCloud />
              </div>
              <div className="mt-4 flex justify-center lg:mt-5">
                <span className="inline-flex items-center rounded-full border border-cyan-700/40 bg-cyan-900/20 px-2.5 py-0.5 text-xs font-medium uppercase tracking-[0.12em] text-cyan-200">
                  Tech Stack
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
