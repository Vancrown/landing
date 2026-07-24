import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">eii...</h1>
      <p className="mb-4">
        {`Hi, this is eii...
        `}
      </p>
      <p className="mb-0">{`Welcome to my landing page.`}</p>
      <p className="mb-0">{`I am sharing my boring journels, views and poems here.`}</p>
      <p className="mb-0">{`I know I am writing nonsense.`}</p>
      <p className="mb-4">{`If you don't like them, please leave the page quitely and do not let me know.
       `}</p>
      <p className="mb-4">{`Wish you had a great time here. `}</p>

      <div className="py-4">{}</div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
