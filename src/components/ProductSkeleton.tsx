import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';

export default function ProductSkeleton() {
  return (
    <Card className='w-64 max-w-sm my-4' radius='none' shadow='sm'>
      <CardHeader className='text-lg font-semibold flex flex-col items-center'>
        {/* Product name skeleton */}
        <Skeleton className='rounded-sm'>
          <div className='h-6 w-32 rounded-sm bg-default-300' />
        </Skeleton>
      </CardHeader>

      <CardBody>
        {/* Product image skeleton */}
        <Skeleton className='rounded-sm'>
          <div className='w-full h-80 rounded-sm bg-default-300' />
        </Skeleton>
      </CardBody>

      <CardFooter className='flex flex-col gap-2 items-center'>
        {/* Product description skeleton */}
        <div className='space-y-2 w-full'>
          <Skeleton className='rounded-sm'>
            <div className='h-3 w-full rounded-sm bg-default-200' />
          </Skeleton>
          <Skeleton className='rounded-sm'>
            <div className='h-3 w-4/5 rounded-sm bg-default-200' />
          </Skeleton>
          <Skeleton className='rounded-sm'>
            <div className='h-3 w-3/5 rounded-sm bg-default-200' />
          </Skeleton>
        </div>

        {/* Price and actions skeleton */}
        <div className='flex justify-between w-full items-center mt-2'>
          <Skeleton className='rounded-sm'>
            <div className='h-6 w-16 rounded-sm bg-default-300' />
          </Skeleton>
          
          <div className='flex gap-4'>
            <Skeleton className='rounded-sm'>
              <div className='h-8 w-8 rounded-sm bg-default-300' />
            </Skeleton>
            <Skeleton className='rounded-sm'>
              <div className='h-6 w-6 rounded-sm bg-default-300' />
            </Skeleton>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
