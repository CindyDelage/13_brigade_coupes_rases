import { StatusWithLabel } from "@/features/clear-cut/components/StatusWithLabel";
import { TagBadge } from "@/features/clear-cut/components/TagBadge";
import type { ClearCutReport } from "@/features/clear-cut/store/clear-cuts";
import { useNavigate } from "@tanstack/react-router";
import { FormattedDate } from "react-intl";

export function ClearCutItem({
	id,
	created_at,
	status,
	comment,
	tags,
	city,
}: ClearCutReport) {
	const navigate = useNavigate();
	const handleCardClick = () => {
		navigate({
			to: "/clear-cuts/$clearCutId",
			params: { clearCutId: id },
		});
	};

	return (
		<li
			onClick={() => handleCardClick()}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleCardClick();
				}
			}}
			className="flex flex-col cursor-pointer gap-2"
		>
			<div className="flex justify-between">
				<h3 className="me-auto text-lg font-bold text-gray-800">{city}</h3>
				<FormattedDate value={created_at} />
			</div>
			<StatusWithLabel status={status} />
			{comment && <p className="text-zinc-500 line-clamp-2">{comment}</p>}
			<div className="flex gap-2 ">
				{tags.map((tag) => (
					<TagBadge key={tag.id} {...tag} />
				))}
			</div>
		</li>
	);
}
