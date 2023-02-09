package kr.co.vilez.ui.share

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kr.co.vilez.data.dto.BoardData
import kr.co.vilez.databinding.ImminentListItemBinding
import kr.co.vilez.ui.chat.ChatRoomActivity
import kr.co.vilez.util.ApplicationClass
import retrofit2.awaitResponse

private const val TAG = "빌리지_ShareToChatAdapter"
class ShareToChatAdapter(val list: MutableList<BoardData>):
RecyclerView.Adapter<ShareToChatAdapter.ShareHolder>(){

    var pos = -1
    private lateinit var itemClickListener: OnItemClickListener
    interface OnItemClickListener { // 클릭 이벤트 리스너 인터페이스
        fun onClick(view: View, position: Int)
    }

    fun setItemClickListener(OnItemClickListener: OnItemClickListener) {
        this.itemClickListener = OnItemClickListener
    }

    inner class ShareHolder(var binding: ImminentListItemBinding):
    RecyclerView.ViewHolder(binding.root) {
        /**
         * share : 내가 빌린내역 => 내가 무조건 피공유자(notShareUser), 상대방(공유자) : shareUser
         */
        fun bindingInfo(item: BoardData) {
            binding.boardData = item
            binding.root.setOnClickListener {
                val intent = Intent(binding.root.context, ChatRoomActivity::class.java)
                CoroutineScope(Dispatchers.Main).launch {
                    val result = ApplicationClass.chatApi.isExistChatroom(item.boardId, item.type, ApplicationClass.prefs.getId()).awaitResponse().body()
                    if(result?.flag == "success") {
                        intent.putExtra("roomId", result.data[0].id)
                        intent.putExtra("otherUserId", result.data[0].shareUserId) // shareUserId가 공유자
                        val otherUser = ApplicationClass.userApi.getUserDetail(result.data[0].shareUserId).awaitResponse().body()
                        if(otherUser?.flag == "success") {
                            intent.putExtra("nickName", otherUser.data[0].nickName) // 채팅 상대의 닉네임
                            intent.putExtra("profile", otherUser.data[0].profile_img) // 채팅 상대의 프로필 이미지
                            Toast.makeText(binding.root.context, "예약이 진행된 채팅방으로 이동합니다.", Toast.LENGTH_SHORT).show()
                            binding.root.context.startActivity(intent)
                        } else {
                            Toast.makeText(binding.root.context, "이 약속의 채팅 정보를 불러올 수 없습니다.", Toast.LENGTH_SHORT).show()
                        }
                    } else {
                        Toast.makeText(binding.root.context, "이 약속의 채팅 정보를 불러올 수 없습니다.", Toast.LENGTH_SHORT).show()
                    }
                }

            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ShareHolder {
        // 아이템 하나를 바인딩해서 바로 xml을 찾아갈 수 있도록 함
        val binding = ImminentListItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        return ShareHolder(binding)
    }

    override fun onBindViewHolder(holder: ShareHolder, position: Int) {
        holder.bindingInfo(list[position]) // 데이터 하나씩 넣기
    }

    override fun getItemCount(): Int = list.size

}