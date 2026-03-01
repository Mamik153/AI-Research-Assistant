import { ShimmeringText } from "../components/ui/shimmering-text";
import { Orb } from "../components/ui/orb";

interface LoadingAnimationProps {
  chainOfThought?: string[];
  topic?: string;
  message?: string;
}

export const LoadingAnimation = ({
  chainOfThought,
  topic,
  message,
}: LoadingAnimationProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in h-[80vh]">
      <Orb
        colors={["#000000", "#279f59"]}
        className="w-20 h-20"
        agentState="listening"
        resizeDebounce={500}
      />

      {/* Chain of Thought Stream */}
      <div className="mt-8 px-4 w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-3">
        <ShimmeringText
          text={
            message?.split("]")[1] ||
            (chainOfThought && chainOfThought.length > 0
              ? chainOfThought[chainOfThought.length - 1]
              : `Synthesizing Knowledge about ${topic}...`)
          }
          duration={3}
          color="#bebebeff"
          className="text-xl text-center"
        />
        {message && chainOfThought && chainOfThought.length > 0 && (
          <p className="text-sm text-gray-400 text-center animate-pulse">
            {chainOfThought[chainOfThought.length - 1]}
          </p>
        )}
      </div>

      <div className="mt-8 px-4 w-full flex flex-col items-center justify-center max-w-xl mx-auto  border border-yellow-500/20 bg-gradient-to-br from-yellow-400/10 to-white/20 backdrop-blur-xl rounded-xl p-4 text-yellow-500">
        <p className="text-base">
          It takes some time to generate the research report.
        </p>
        <p className="text-base">Please be patient.</p>
      </div>
    </div>
  );
};
