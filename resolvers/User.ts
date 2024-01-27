import { LinkType } from '@/lib/types';

// @ts-ignore
export async function links(parent, args, context) {
    const userKey = 'userlinks'.concat('_', parent.id);


    const snapshot = await context.db.collection('graphql3').doc('hackernews').collection('feed').where('postedById', '==', parent.id).get();


    const feedArr: LinkType[] = [];
    snapshot.forEach((doc: any) => {
      feedArr.push({id: doc.id, ...doc.data()});
    });
    return feedArr;
}
