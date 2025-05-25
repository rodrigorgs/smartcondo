// Utility function to extract the current user from the request object
// Usage: const user = getCurrentUserFromRequest(req);

import { Request } from 'express';
import { User } from 'users/entities/user.entity';

export async function getCurrentUserFromRequest(
  req: Request,
): Promise<User | null> {
  const userId = (req.user as { sub?: string })?.sub;
  const user = userId ? await this.usersService.findOne(userId) : null;
  return user;
}
