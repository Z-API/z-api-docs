import OriginalCategory from '@theme-original/DocSidebarItem/Category';
import type { Props } from '@theme/DocSidebarItem/Category';
import { getIcon } from '../../icons/lucide';

export default function CategoryItem(props: Props) {
  const item = (props as any).item ?? props;
  const Icon = getIcon(item?.customProps?.icon);
  if (!Icon) {
    return <OriginalCategory {...props} />;
  }
  const label = item?.label ?? (props as any).label;
  const itemWithIcon = {
    ...item,
    label: (
      <span className="sidebarItemWithIcon">
        <Icon className="sidebarItemIcon" aria-hidden width={16} height={16} />
        <span>{label}</span>
      </span>
    ),
  };

  return (
    <OriginalCategory
      {...props}
      item={itemWithIcon as any}
    />
  );
}


