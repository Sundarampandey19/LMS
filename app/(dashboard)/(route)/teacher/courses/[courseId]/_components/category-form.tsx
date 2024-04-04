"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ComboBox  } from "@/components/ui/combobox";


interface CategoryFormProps {
  initialData: Course
  courseId: string;
  options:{label:string, value:string}[]
}


const formSchema = z.object({
    categoryId: z.string().min(1),
});

const CategoryForm = ({ initialData, courseId , options }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{   categoryId : initialData?.categoryId  || ""},
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
        await axios.patch(`/api/courses/${courseId}`,values)
        toast.success("Course Updated")
        toggleEdit()
        router.refresh()


    }catch{
        toast.error("Something Went Wrong")
    }
  };

  const selectedOption = options.find((option)=> option.value ===initialData.categoryId)

  return (
    <div className="mt-6 border bg-slate-100 rounded-md mb-24 p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && " text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No Category"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4 "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <ComboBox  {...field} options={options}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
