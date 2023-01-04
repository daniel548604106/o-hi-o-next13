export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

interface EventProps {
  action: string;
  category: string;
  label: string;
  value: string;
}
export const pageview = (url: string) => {
  window.gtag("config", GA_MEASUREMENT_ID as string, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: EventProps) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
