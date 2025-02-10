import { AppLayout } from "@/core/components/AppLayout";
import { List } from "@/features/clear-cutting/components/List";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_clear-cuttings/list")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AppLayout>
			<List />
		</AppLayout>
	);
}
