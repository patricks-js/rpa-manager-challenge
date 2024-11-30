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
import { useAuthStore } from "@/hooks/use-auth-store";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  cpf: z.string(),
});

export function SearchRPAPage() {
  const { token } = useAuthStore.getState();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.auth.rpa[":cpf"].$get(
        {
          param: {
            cpf: values.cpf,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}}`,
          },
        },
      );

      if (response.status === 404) {
        return toast.error("RPA não encontrada");
      }

      const data = await response.json();

      navigate(`/rpa-form/${data.rpa.cpf}`, { replace: true });
      console.log(data);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Falha ao buscar RPA. Por favor, tente novamente.");
    }
  }

  return (
    <div className="grid place-content-center h-full">
      <header className="space-y-8">
        <h1 className="text-2xl font-medium">Buscar RPA por CPF</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF do autônomo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CPF"
                      type=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Buscar</Button>
          </form>
        </Form>
      </header>
    </div>
  );
}
