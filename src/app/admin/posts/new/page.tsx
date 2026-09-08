import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-parchment-100">Yeni Blog Yazisi</h1>
      <div className="mt-8 max-w-3xl">
        <PostForm />
      </div>
    </div>
  );
}
