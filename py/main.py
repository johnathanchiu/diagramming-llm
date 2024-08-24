from openai import OpenAI

from diagrammer.model import MermaidDiagram, Node, Edge, Subgraph


client = OpenAI()


def generate_mermaid(diagram: MermaidDiagram) -> str:
    def node_to_mermaid(node):
        if isinstance(node, Node):
            return f'{node.id}["{node.label or node.id}"]'
        elif isinstance(node, Edge):
            return f'{node.source} -->{f"|{node.label}|" if node.label else ""} {node.target}'
        elif isinstance(node, Subgraph):
            inner_content = "\n".join([node_to_mermaid(n) for n in node.nodes])
            return f"subgraph {node.title}\n{inner_content}\nend"

    content = "\n".join([node_to_mermaid(node) for node in diagram.nodes])
    return (
        f"classDiagram\n{diagram.title}\n{content}"
        if diagram.title
        else f"classDiagram\n{content}"
    )


sys_prompt = "You are a tutor that creates visual diagrams that are outputted by generated mermaid.js code."


def complete():
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": sys_prompt},
            {"role": "user", "content": "help me better understand the krebs cycle"},
        ],
        response_format=MermaidDiagram,
    )

    message = completion.choices[0].message
    if message.parsed:
        return generate_mermaid(message.parsed)
    return None


mermaid_code = complete()
print(mermaid_code)
