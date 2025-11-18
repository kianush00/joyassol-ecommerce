import { cn } from "@/lib/utils";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return (
    <span className={cn("text-sm font-semibold text-darkColor", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
