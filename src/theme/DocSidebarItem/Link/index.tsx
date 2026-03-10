import OriginalLink from '@theme-original/DocSidebarItem/Link';
import type { Props } from '@theme/DocSidebarItem/Link';
import { getIcon } from '../../icons/lucide';

export default function LinkItem(props: Props) {
  const item = (props as any).item ?? props;
  const Icon = getIcon(item?.customProps?.icon);
  if (!Icon) {
    return <OriginalLink {...props} />;
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
    <OriginalLink
      {...props}
      item={itemWithIcon as any}
    />
  );
}


