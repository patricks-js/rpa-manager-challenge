import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getRPAByCPF } from "@/services/get-rpa-by-cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  cpf: z.string(),
});

export function HomePage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await getRPAByCPF(values.cpf);

      navigate(`/edit-rpa/${data.rpa.cpf}`, { replace: true });
      console.log(data);
    } catch (error) {
      console.error("Form submission error", error);
      toast.info("RPA não encontrada.");
      navigate("/register-rpa", { replace: true });
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-sm flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full mx-auto"
          >
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-center">
                    Buscar RPA por CPF
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CPF do autônomo"
                      type=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
            >
              Buscar
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              ou registrar novo RPA
            </span>
          </div>
        </div>
        <Button
          asChild
          className="w-full items-start"
        >
          <Link to="/register-rpa">Registrar RPA</Link>
        </Button>
      </div>
    </div>
  );
}
