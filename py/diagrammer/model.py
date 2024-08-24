from pydantic import BaseModel, Field
from typing import List, Optional, Union


class Node(BaseModel):
    id: str
    label: Optional[str] = None

    def to_mermaid(self) -> str:
        return f'{self.id}["{self.label or self.id}"]'


class Edge(BaseModel):
    source: str
    target: str
    label: Optional[str] = None

    def to_mermaid(self) -> str:
        return (
            f'{self.source} -->{f"|{self.label}|" if self.label else ""} {self.target}'
        )


class Subgraph(BaseModel):
    title: str
    nodes: List[Union["Subgraph", Node, Edge]]

    def to_mermaid(self) -> str:
        inner_content = "\n".join([node.to_mermaid() for node in self.nodes])
        return f"subgraph {self.title}\n{inner_content}\nend"


class MermaidDiagram(BaseModel):
    title: Optional[str] = None
    nodes: List[Union[Subgraph, Node, Edge]]

    def to_mermaid(self) -> str:
        content = "\n".join([node.to_mermaid() for node in self.nodes])
        return (
            f"classDiagram\n{content}"
            if not self.title
            else f"classDiagram\n{self.title}\n{content}"
        )
