import { PassageChunk, ChunkQuestion } from "@/types";

export const passageChunks: PassageChunk[] = [
  {
    id: 0,
    title: "The Hive Hierarchy & the Queen",
    content:
      "A honeybee colony is one of nature's most organized societies, home to as many as 60,000 individuals working in perfect coordination. At the heart of every hive is the queen — the only bee capable of laying fertilized eggs. She can produce up to 2,000 eggs per day during peak season, and her pheromones regulate the behavior and mood of the entire colony. Without her chemical signals, workers become agitated and the hive falls into disarray. The queen is not a ruler who gives orders; rather, she is the biological anchor around which all colony life revolves. When a queen ages or dies, workers select several young larvae and feed them a special substance called royal jelly. This protein-rich secretion triggers the development of a new queen, ensuring the colony's survival. The first new queen to emerge will often sting and eliminate her rivals still developing in their cells.",
    highlightRange: {
      start: 389,
      end: 530,
    },
  },
  {
    id: 1,
    title: "Worker Roles & the Drones",
    content:
      "Worker bees are all female, and their duties shift as they age in a remarkable system called age-based polyethism. During their first three days, young workers clean the cells where new eggs will be laid. From days 3 to 12, they graduate to nursing duty, feeding larvae with a mixture of honey, pollen, and glandular secretions. Between days 12 and 20, workers take on middle-aged roles: building wax comb, processing nectar into honey, and guarding the hive entrance against intruders. Only after about three weeks of life do workers finally become foragers, venturing out to collect nectar and pollen from flowers up to five kilometers away. Drones, the only males in the colony, have a single purpose: to mate with a queen from another hive. They have larger eyes to spot queens during mating flights but possess no stinger and cannot forage. After mating season ends in autumn, drones are expelled from the hive because they consume resources without contributing labor.",
    highlightRange: {
      start: 82,
      end: 555,
    },
  },
  {
    id: 2,
    title: "Communication & the Waggle Dance",
    content:
      "Honeybees communicate primarily through movement, vibration, and chemical signals. The most famous behavior is the waggle dance, discovered by Austrian scientist Karl von Frisch in the 1940s, a finding that earned him the Nobel Prize in 1973. When a forager locates a rich source of nectar, she returns to the hive and performs a figure-eight dance on the surface of the comb. The angle of the straight run in the middle of the figure-eight indicates the direction of the food source relative to the sun. The duration of the waggle — the vigorous side-to-side shaking during the straight run — encodes the distance: a longer waggle means a farther source. Other foragers crowd around the dancer, using their antennae to detect vibrations and scent from the pollen clinging to her body. Humans and honeybees share a history stretching back at least 9,000 years, as evidenced by ancient rock paintings in Spain depicting honey harvesting. Today, managed honeybee colonies are essential pollinators for roughly one-third of the food we eat, making their recent population declines a matter of global concern.",
    highlightRange: {
      start: 309,
      end: 557,
    },
  },
];

export const chunkQuestions: ChunkQuestion[] = [
  {
    chunkId: 0,
    question:
      "Why is the queen considered the 'biological anchor' of the colony rather than a ruler who gives orders?",
  },
  {
    chunkId: 1,
    question:
      "Describe how a worker bee's responsibilities change as she ages, and explain why drones are expelled from the hive in autumn.",
  },
  {
    chunkId: 2,
    question:
      "How does the waggle dance communicate both the direction and distance of a food source to other bees?",
  },
];
