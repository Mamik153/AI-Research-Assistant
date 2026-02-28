import { ShimmeringText } from "../components/ui/shimmering-text";
import { Orb } from "../components/ui/orb";

interface LoadingAnimationProps {
  chainOfThought?: string[];
  topic?: string;
}

export const LoadingAnimation = ({
  chainOfThought,
  topic,
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
      {chainOfThought && chainOfThought.length > 0 && (
        <div className="mt-8 px-4 w-full max-w-2xl mx-auto flex items-center justify-center">
          <ShimmeringText
            text={
              chainOfThought.length > 0
                ? chainOfThought[chainOfThought.length - 1].split("] ")[1]
                : `Synthesizing Knowledge about ${topic}...`
            }
            duration={3}
            color="#bebebeff"
            className="text-xl text-center"
          />
        </div>
      )}

      <div className="mt-8 px-4 w-full max-w-2xl mx-auto  border border-dashed border-yellow-500/40 bg-gradient-to-br from-yellow-400/5 to-blue-400/5 backdrop-blur-xl rounded-xl p-4">
        <h4 className="text-lg font-bold mb-2">Note:</h4>
        <p className="text-sm">
          It takes some time to generate the research report.
        </p>
        <p className="text-sm">Please be patient.</p>
      </div>
    </div>
  );
};
