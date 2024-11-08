export default async function Page({params}) {
    const page = (await params).page;
    let list = [];
    for (let i =0; i < 50; i++) {
      list.push(<p>Example paragraph {i}</p>);
    };
    return (
        <div>
            <h1 className="font-black text-2xl">Тут будут учебные материалы. Сейчас открыто: {page}</h1>
            {list}
        </div>
    );
}
