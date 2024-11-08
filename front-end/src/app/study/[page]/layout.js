import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default async function Layout({children, params}) {
    const page = (await params).page;
    return (
        <ResizablePanelGroup direction="horizontal" className="max-h-[100%]" autoSaveId="study">
          <ResizablePanel defaultSize={20}>Слева будет навигация</ResizablePanel>
          <ResizableHandle/>
          <ResizablePanel><div className="overflow-scroll max-h-[100%]">{children}</div></ResizablePanel>
        </ResizablePanelGroup>
    );
}
