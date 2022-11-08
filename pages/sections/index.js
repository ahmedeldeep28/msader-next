import Head from 'next/head'
import HeroPages from '../../components/layout/HeroPages';
import SectionCard from './../../components/cards/SectionCard';
import HeadSetion from '../../components/HeadSetion';
import { fetchApi } from '../../utils/handelApi';
import HandelError from '../../components/HandelError';

function Sections({categorys,error}) {

  const categorysMaping = categorys.map((category) => {
    return (
      <div className="col-sm-6 col-md-4  mt-5" key={category._id}>
      <SectionCard name={category.name} image={category.image} />
    </div>
    )
  })

  const categorysList = () => {
    if(categorys.length === 0) {
      return <HandelError image="writing-room.svg" text="لا يتوجد اقسام علي الموقع الان" />
    } else {
      return <div className="row">{categorysMaping}</div>
    }
  }

  return (
    <>
      <Head>
        <title>مصادر - الاقسام</title>
        <meta name="description" content="يتم الرد علي الكثير من الاسئله التي توضح اهداف الموقع والمبادئ التي يتبعها الموقع والتي تساعد الناس علي معرفتنا اكثر والاسائله التي تساعدك في الوصول الي اكبر قدر من المعرفة بنا" />
      </Head>
      <HeroPages
        title="كل الاقسام التي تريدها تجدها"
        text="هنا تجد كل الاقسام التي نكتب عنها المواضيع المختلفه علي المنصه ويتم اضافة اقسام جديدة مع مرور الوقت من اجل تغطية كل المواضيع المهمه"
      />
      <section className="py-5">
        <div className="container">
          <HeadSetion
            title="كل الاقسام الموجوده علي المنصه"
            text="نحن نوفر اليك الكثير من الاقسام في اغلب المجالات,كل ما عليك فعله هو الدخول الي احدي الاقسام لتجد كل المقالات المتعلقه بهذا القسم"
          />
          
          {error 
            ? <HandelError image="server_down.svg"  text="توجد مشكله في الخادم الان" /> 
            : categorysList()
            }
          
        </div>
      </section>
    </>
  )
}

export default Sections


export async function getServerSideProps() {
  try {
    const { categorys } = await fetchApi('categorys');
    return {
      props: {
        categorys,
        error: null,
      },
    }
  } catch (error) {
    return {
      props: {
        categorys: [],
        error,
      },
    }
  }
}
