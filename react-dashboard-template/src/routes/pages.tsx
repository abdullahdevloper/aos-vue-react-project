import { Grid } from "@mui/material";
import AppSettings from "../components/AppSettings/Index";
import { BarChart, BubbleChart, DoughnutChart, HorizontalBarChart, LineChart, PieChart, PolarareaChart, RadarChart, ScatterChart } from "../components/ChartJS";
import CountDown from "../components/CountDown";
import { ContentCard } from "../components/common";
import BasicStatistic from "../components/UI/Widgets/Cards/Statistics/BasicStatistic";
import ColumnarStatistic from "../components/UI/Widgets/Cards/Statistics/ColumnarStatistic";
import StatsChartAnalysis from "../components/UI/Widgets/Cards/Analytical/StatsChartAnalysis";
import CourseCard from "../components/UI/Widgets/Cards/Others/CourseCard";
import ProductDetailsCard from "../components/UI/Widgets/Cards/E-Commerce/ProductDetailsCard";
import CartCard from "../components/UI/Widgets/Cards/E-Commerce/CartCard";
import FabIconCard from "../components/UI/Widgets/Cards/E-Commerce/FabIconCard";
import UserProfileCard from "../components/UI/Widgets/Cards/User/UserProfileCard";
import UserSocialCard from "../components/UI/Widgets/Cards/User/UserSocialCard";
import BlogPost from "../components/UI/Widgets/Cards/Posts/BlogPost";
import ArticlePost from "../components/UI/Widgets/Cards/Posts/ArticlePost";
import TextPost from "../components/UI/Widgets/Cards/Posts/TextPost";
import SearchableList from "../components/UI/Widgets/Lists/SearchableList";
import CheckList from "../components/UI/Widgets/Lists/CheckList/CheckList";
import HorizontalCardList from "../components/UI/List/HorizontalCardList";
import FlexList from "../components/UI/List/FlexList/FlexList";
import TwoLinesItems from "../components/UI/List/TwoLinesItems";
import ListGroup from "../components/UI/NavigationItems/ListGroup";
import LinearProgressAvatar from "../components/UI/ProgressBar/LinearProgressAvatar";
import LinearProgressContent from "../components/UI/ProgressBar/LinearProgressContent";
import VuseSectionDefinition from "../components/Stock/VuseSectionDefinition";

export function DashboardPage() {
  return (
    <>
      <VuseSectionDefinition title="Analytical Dashboard" subtitle="Parallel React implementation of the Vuse dashboard component set." />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}><BasicStatistic /></Grid>
        <Grid item xs={12} md={3}><UserSocialCard /></Grid>
        <Grid item xs={12} md={3}><ProductDetailsCard /></Grid>
        <Grid item xs={12} md={3}><ContentCard title="Countdown"><CountDown /></ContentCard></Grid>
        <Grid item xs={12} md={8}><StatsChartAnalysis /></Grid>
        <Grid item xs={12} md={4}><ColumnarStatistic /></Grid>
      </Grid>
    </>
  );
}

export function ChartsPage() {
  const charts = [<BarChart />, <HorizontalBarChart />, <LineChart />, <PieChart />, <DoughnutChart />, <RadarChart />, <ScatterChart />, <BubbleChart />, <PolarareaChart />];
  return <Grid container spacing={3}>{charts.map((chart, index) => <Grid item xs={12} md={6} lg={4} key={index}>{chart}</Grid>)}</Grid>;
}

export function WidgetsPage() {
  const widgets = [<CourseCard />, <CartCard />, <FabIconCard />, <UserProfileCard />, <BlogPost />, <ArticlePost />, <TextPost />];
  return <Grid container spacing={3}>{widgets.map((widget, index) => <Grid item xs={12} md={4} key={index}>{widget}</Grid>)}</Grid>;
}

export function ListsPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}><ContentCard title="Searchable List"><SearchableList /></ContentCard></Grid>
      <Grid item xs={12} md={6}><ContentCard title="Checklist"><CheckList /></ContentCard></Grid>
      <Grid item xs={12}><HorizontalCardList /></Grid>
      <Grid item xs={12} md={4}><ContentCard title="Flex List"><FlexList /></ContentCard></Grid>
      <Grid item xs={12} md={4}><ContentCard title="Two Lines"><TwoLinesItems /></ContentCard></Grid>
      <Grid item xs={12} md={4}><ListGroup /></Grid>
      <Grid item xs={12} md={6}><ContentCard title="Progress Avatar"><LinearProgressAvatar /></ContentCard></Grid>
      <Grid item xs={12} md={6}><ContentCard title="Progress Content"><LinearProgressContent /></ContentCard></Grid>
    </Grid>
  );
}

export function SettingsPage() {
  return <ContentCard title="Application Settings"><AppSettings /></ContentCard>;
}
