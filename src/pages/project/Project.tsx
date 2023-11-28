interface ProjectProps {
  title: string;
}

export default function Project({ title }: ProjectProps) {
  return <div>{title}</div>;
}
