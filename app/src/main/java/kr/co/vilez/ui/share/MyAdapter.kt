package kr.co.vilez.ui.share

import android.util.Log
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import androidx.viewpager2.adapter.FragmentStateAdapter
import kr.co.vilez.data.model.ImgPath

private const val TAG = "빌리지_MyAdapter"
class MyAdapter(val fa:FragmentActivity, var count: Int = 0, var list:List<ImgPath>) : FragmentStateAdapter(fa) {

    override fun createFragment(position: Int): Fragment {
        Log.d(TAG, "createFragment: count:$count, position:$position")
        val index = getRealPosition(position)
        return if (index == 0) FirstFragment(list[index].path)
        else if (index == 1) SecondFragment(list[index].path)
        else if (index == 2) ThirdFragment(list[index].path)
        else ForthFragment(list[index].path)
    }

    override fun getItemCount(): Int {
        return 2000
    }

    fun getRealPosition(position: Int): Int {
        return position % count
    }

}