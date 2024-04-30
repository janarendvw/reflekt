import { createUserSchema, loginUserSchema } from '@/lib/user-schema';
import { privateProcedure, publicProcedure, router} from '@/server/trpc';
import { loginHandler, logoutHandler, registerHandler } from '@/server/controllers/auth';


const authRouter = router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input })),
  loginUser: publicProcedure
    .input(loginUserSchema)
    .mutation(({ input }) => loginHandler({ input })),
  logoutUser: privateProcedure.mutation(() => logoutHandler()),
});

export default authRouter;
